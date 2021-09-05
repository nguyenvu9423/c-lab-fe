import * as React from 'react';
import * as yup from 'yup';
import { Form, Dropdown, Message } from 'semantic-ui-react';
import { useFormik, FormikHelpers } from 'formik';
import { SubmissionService } from '../../../service/SubmissionService';
import {
  getSubLangTitle,
  SubmissionLanguage,
} from '../../../domains/submission-lang/SubmissionLanguage';
import { BaseException } from '../../../exception';
import { SubmissionForm } from './SubmissionForm';
import { FileUploadInput } from '../../../page/common/inputs/FileUploadInput';
import { useErrorMessageRenderer } from '../../../components';

export namespace CompactSubmissionForm {
  export type Props = SubmissionForm.Props;
  export interface Value {
    language: SubmissionLanguage;
    codeFile: File;
  }
}
export const validationSchema = yup.object({
  language: yup.mixed().required('Language is required'),
  codeFile: yup.mixed().required('Code file is required'),
});

export const CompactSubmissionForm: React.FC<CompactSubmissionForm.Props> = (
  props
) => {
  const { problem, onSuccess } = props;
  const [overallError, setOverallError] = React.useState<
    BaseException | undefined
  >();

  const onSubmitHanlder = React.useCallback(
    (
      values: CompactSubmissionForm.Value,
      helpers: FormikHelpers<CompactSubmissionForm.Value>
    ) => {
      setOverallError(undefined);
      const { language, codeFile } = values;
      return SubmissionService.submit({
        problemCode: problem.code,
        language,
        code: codeFile,
      })
        .then((response) => {
          onSuccess?.(response.data);
          helpers.resetForm();
        })
        .catch((err) => {
          setOverallError(err);
        });
    },
    [problem.code, onSuccess]
  );

  const { values, touched, errors, handleSubmit, setFieldValue, isSubmitting } =
    useFormik<SubmissionForm.Value>({
      initialValues: {
        language: problem.allowedLanguages[0],
        codeFile: undefined,
      },
      validationSchema,
      onSubmit: onSubmitHanlder,
    });

  const errorMsgRenderer = useErrorMessageRenderer({ errors, touched });

  return (
    <Form onSubmit={handleSubmit} error loading={isSubmitting}>
      <Form.Field>
        <FileUploadInput
          onChange={(file) => {
            console.log('file changed');
            setFieldValue('codeFile', file);
          }}
          file={values.codeFile}
        />
        {errorMsgRenderer('codeFile')}
      </Form.Field>
      <Form.Field>
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

      <Form.Button type="submit" primary>
        Submit
      </Form.Button>
    </Form>
  );
};
