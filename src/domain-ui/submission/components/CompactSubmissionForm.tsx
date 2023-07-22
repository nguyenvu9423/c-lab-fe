import * as React from 'react';
import * as yup from 'yup';
import { Form, Message } from 'semantic-ui-react';
import { useFormik, FormikHelpers } from 'formik';
import { SubmissionService } from '@/services/submission/SubmissionService';
import { SubmissionLanguage } from '@/domains/submission-lang';
import { BaseException } from '../../../shared/exceptions';
import { SubmissionForm } from './SubmissionForm';
import { FileUploadInput } from '../../../pages/common/inputs/FileUploadInput';
import { useErrorMessageRenderer } from '../../../components';
import { SubmissionLangSelect } from '../../submission-lang/SubmissionLangSelect';

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

  const initialLanguage = SubmissionLanguage.useInitial(
    SubmissionLanguage.values
  );

  const { values, touched, errors, handleSubmit, setFieldValue, isSubmitting } =
    useFormik<SubmissionForm.Value>({
      enableReinitialize: true,
      initialValues: {
        language: initialLanguage,
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
            setFieldValue('codeFile', file);
          }}
          file={values.codeFile}
        />
        {errorMsgRenderer('codeFile')}
      </Form.Field>
      <Form.Field>
        <SubmissionLangSelect
          value={values.language}
          options={SubmissionLanguage.values}
          onChange={(lang) => setFieldValue('language', lang)}
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
