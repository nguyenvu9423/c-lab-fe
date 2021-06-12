import * as React from 'react';
import { Form } from 'semantic-ui-react';
import { FileUploadInput } from '../../common/inputs/FileUploadInput';
import { useFormik } from 'formik';
import { SubmissionService } from '../../../service/SubmissionService';
import { SubmissionLangInput } from '../../submission/components';

export function CompactCodeSubmissionForm(props) {
  const { problem, onSubmitDone } = props;

  const onSubmitHanlder = React.useCallback(
    (values, { setSubmitting }) => {
      const { language, codeFile } = values;
      setSubmitting(true);
      SubmissionService.submit({
        problemId: problem.id,
        languageName: language.name,
        codeFile
      })
        .then(response => {
          setSubmitting(false);
          onSubmitDone?.(response.data);
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [onSubmitDone]
  );

  const formik = useFormik({
    initialValues: {
      language: problem.allowedLanguages[0],
      codeFile: undefined
    },
    onSubmit: onSubmitHanlder
  });
  const { values, handleSubmit, setFieldValue, isSubmitting } = formik;

  return (
    <Form onSubmit={handleSubmit} loading={isSubmitting}>
      <Form.Field>
        <FileUploadInput
          onChange={file => setFieldValue('codeFile', file)}
          file={values.codeFile}
        />
      </Form.Field>
      <Form.Field>
        <SubmissionLangInput
          problem={problem}
          value={values.language}
          onChange={lang => setFieldValue('language', lang)}
        />
      </Form.Field>
      <Form.Button type="submit" primary>
        Gửi
      </Form.Button>
    </Form>
  );
}
