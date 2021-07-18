import * as React from 'react';
import * as yup from 'yup';
import { Form, Message, Dropdown } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { SubmissionService } from '../../../service/SubmissionService';
import { CodeEditor } from '../../../components/editors';
import { Problem } from '../../../domains/problem';
import { FileUploadInput } from '../../../page/common/inputs/FileUploadInput';
import { RequestException } from '../../../exception/BaseResponseException';
import {
  getSubLangTitle,
  SubmissionLanguage,
} from '../../submission-lang/SubmissionLanguage';
import { useErrorMessageRenderer } from '../../../components';

export namespace SubmissionForm {
  export interface Props {
    problem: Problem;

    onSuccess?(value: any): void;
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
  const [overallError, setOverallError] = React.useState<RequestException>();

  const { values, touched, errors, setFieldValue, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        language: problem.allowedLanguages[0],
        codeText: '',
        codeFile: undefined,
      },
      validationSchema: SubmissionFormSchema,
      onSubmit: (values, helpers) => {
        const { language, codeText, codeFile } = values;
        return SubmissionService.submit({
          problemId: problem.id,
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
        <Dropdown
          selection
          placeholder="Select language"
          options={problem.allowedLanguages.map((lang) => ({
            value: lang,
            text: getSubLangTitle(lang),
          }))}
          onChange={(event, data) => setFieldValue('language', data.value)}
          value={values.language}
        />
        {errorMsgRenderer('language')}
      </Form.Field>
      {overallError && (
        <Message negative>
          <p>{overallError.message}</p>
        </Message>
      )}
      <Form.Button type="submit" primary floated="right">
        Submit
      </Form.Button>
    </Form>
  );
};
