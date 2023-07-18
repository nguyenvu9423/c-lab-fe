import * as React from 'react';
import * as yup from 'yup';
import { Form, Message } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { SubmissionService } from '../../../services/SubmissionService';
import { CodeEditor } from '../../../components/editors';
import { Problem } from '../../../domains/problem';
import { FileUploadInput } from '../../../pages/common/inputs/FileUploadInput';
import { ResponseException } from '../../../shared/exceptions';
import {
  SubmissionLangSelect,
  SubmissionLanguage,
} from '../../submission-lang';
import { useErrorMessageRenderer } from '../../../components';
import { SubmissionDTO } from '..';

export namespace SubmissionForm {
  export interface Props {
    problem: Problem;

    onSuccess?(value: SubmissionDTO): void;
  }

  export interface Value {
    language: SubmissionLanguage;
    codeText?: string;
    codeFile?: File;
  }
}

export const SubmissionFormSchema = yup.object({
  language: yup.mixed().required('Language is required'),
  codeText: yup.string(),
  codeFile: yup.mixed().when('codeText', {
    is: (codeText) => {
      return codeText == null;
    },
    then: yup.mixed().required('The code is required'),
  }),
});

export const SubmissionForm: React.FC<SubmissionForm.Props> = (props) => {
  const { problem, onSuccess } = props;
  const [overallError, setOverallError] = React.useState<ResponseException>();

  const initialLang = SubmissionLanguage.useInitial(SubmissionLanguage.values);

  const { values, touched, errors, setFieldValue, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        language: initialLang,
        codeText: '',
        codeFile: undefined,
      },
      validationSchema: SubmissionFormSchema,
      onSubmit: (values, helpers) => {
        const { language, codeText, codeFile } = values;
        return SubmissionService.submit({
          problemCode: problem.code,
          language,
          code: codeFile ?? codeText,
        })
          .then((response) => {
            onSuccess?.(response.data);
            helpers.resetForm();
          })
          .catch((err) => {
            setOverallError(err);
          });
      },
    });

  const errorMsgRenderer = useErrorMessageRenderer({ touched, errors });
  return (
    <Form
      className={'clear-fix-container'}
      error
      onSubmit={handleSubmit}
      loading={isSubmitting}
    >
      <Form.Field>
        <label>Bài làm</label>
        <CodeEditor
          style={{ maxHeight: 420 }}
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
