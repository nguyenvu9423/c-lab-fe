import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Form, Message } from 'semantic-ui-react';

import { CodeEditor } from '@/components/editors';
import { useErrorMessageRenderer } from '@/components/form';
import { SubmissionLangSelect } from '@/domain-ui/submission-lang';
import { Contest } from '@/domains/contest';
import { SubmissionLanguage } from '@/domains/submission-lang';
import { ContestSubmissionService } from '@/services/ContestSubmissionService';
import { ContestSubmissionDto } from '@/services/dtos';
import { ResponseException } from '@/shared/exceptions';
import { ProblemSelectors } from '@/store/selectors';
import { FileUploadInput } from 'src/pages/common/inputs/FileUploadInput';

export namespace ContestProblemSubmitForm {
  export interface Props {
    contest: Contest;
    onSuccess?: (data: ContestSubmissionDto) => void;
  }
}

export const ContestProblemSubmitForm: React.FC<
  ContestProblemSubmitForm.Props
> = (props) => {
  const { contest, onSuccess } = props;
  const { judgeConfig } = contest;
  const problemIds = useMemo(
    () => judgeConfig?.problemConfigs.map((config) => config.problem) ?? [],
    [judgeConfig],
  );

  const problems = useSelector(ProblemSelectors.byIds(problemIds));

  const problemOptions =
    judgeConfig?.problemConfigs.map((config) => {
      const problem = problems.find((problem) => problem.id === config.problem);

      if (!problem) throw new Error('Cannot find problem');

      return {
        text: `${config.code} - ${problem.title}`,
        value: problem.code,
      };
    }) ?? [];

  const hasProblem: boolean = problemOptions.length > 0;
  const [overallError] = React.useState<ResponseException>();
  const initialLang = SubmissionLanguage.useInitial(SubmissionLanguage.values);
  const { values, touched, errors, setFieldValue, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        problemCode: hasProblem ? problemOptions[0].value : '',
        codeText: '',
        codeFile: undefined,
        language: initialLang,
      },
      onSubmit: (values) => {
        const { problemCode, language, codeFile, codeText } = values;
        return ContestSubmissionService.submit({
          contestId: contest.id,
          problemCode,
          language,
          code: codeFile ?? codeText,
        }).then((response) => {
          onSuccess?.(response.data);
        });
      },
    });

  const errorMsgRenderer = useErrorMessageRenderer({ touched, errors });

  if (!hasProblem) return <div>Kì thi chưa có bài tập nào được thiết lập</div>;

  return (
    <Form error onSubmit={handleSubmit}>
      <Form.Field width={6}>
        <label>Bài nộp</label>
        <Form.Select
          options={problemOptions}
          value={values.problemCode}
          onChange={(_event, { value }) => {
            setFieldValue('problemCode', value);
          }}
        />
      </Form.Field>
      <Form.Field>
        <label>Bài làm</label>
        <CodeEditor
          style={{ maxHeight: 320 }}
          value={values.codeText}
          onChange={(value) => {
            setFieldValue('codeText', value);
          }}
        />
        {errorMsgRenderer('codeText')}
      </Form.Field>
      <Form.Field>
        <label>Nộp file</label>
        <FileUploadInput
          file={values.codeFile}
          onChange={(file) => setFieldValue('codeFile', file)}
        />
        {errorMsgRenderer('codeFile')}
      </Form.Field>
      <Form.Field>
        <label>Ngôn ngữ</label>
        <SubmissionLangSelect
          value={values.language}
          options={SubmissionLanguage.values}
          onChange={(value) => setFieldValue('language', value)}
        />

        {errorMsgRenderer('language')}
      </Form.Field>
      {overallError && (
        <Message negative>
          <p>{overallError.message}</p>
        </Message>
      )}
      <Form.Button type="submit" primary floated="right">
        Nộp
      </Form.Button>
    </Form>
  );
};
