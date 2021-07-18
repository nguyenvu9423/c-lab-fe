import * as React from 'react';
import { Form, Dropdown, Message } from 'semantic-ui-react';
import { useFormik, FormikHelpers } from 'formik';
import { SubmissionService } from '../../../service/SubmissionService';
import { getSubLangTitle } from '../../../domains/submission-lang/SubmissionLanguage';
import { BaseException } from '../../../exception';
import { SubmissionForm, SubmissionFormSchema } from './SubmissionForm';
import { FileUploadInput } from '../../../page/common/inputs/FileUploadInput';
import { useErrorMessageRenderer } from '../../../components';

export const CompactSubmissionForm: React.FC<SubmissionForm.Props> = (
  props
) => {
  const { problem, onSuccess } = props;
  const [overallError, setOverallError] = React.useState<
    BaseException | undefined
  >();

  const onSubmitHanlder = React.useCallback(
    (
      values: SubmissionForm.Value,
      helpers: FormikHelpers<SubmissionForm.Value>
    ) => {
      setOverallError(undefined);
      const { language, codeFile } = values;
      return SubmissionService.submit({
        problemId: problem.id,
        language,
        code: codeFile!,
      })
        .then((response) => {
          onSuccess?.(response.data);
          helpers.resetForm();
        })
        .catch((err) => {
          setOverallError(err);
        });
    },
    [problem, onSuccess]
  );

  const { values, touched, errors, handleSubmit, setFieldValue, isSubmitting } =
    useFormik({
      initialValues: {
        language: problem.allowedLanguages[0],
        codeFile: undefined,
      },
      validationSchema: SubmissionFormSchema,
      onSubmit: onSubmitHanlder,
    });

  const errorMsgRenderer = useErrorMessageRenderer({ errors, touched });

  return (
    <Form onSubmit={handleSubmit} error loading={isSubmitting}>
      <Form.Field>
        <FileUploadInput
          onChange={(file) => setFieldValue('codeFile', file)}
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
        Gửi
      </Form.Button>
    </Form>
  );
};
