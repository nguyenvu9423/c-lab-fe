import * as React from 'react';
import { Form } from 'semantic-ui-react';
import { FileUploadInput } from '../../common/inputs/FileUploadInput';
import { SubmissionLangInput } from '../../submission/components/SubmissionLangInput';
import { useFormik } from 'formik';
import ArrayUtils from '../../../utility/ArrayUtils';
import { SubmissionService } from '../../../service/SubmissionService';
import { CodeEditor } from '../../../components/editors';

export const CodeSubmissionForm = props => {
  const { problem } = props;
  const { allowedLanguages } = problem;
  const formik = useFormik({
    initialValues: {
      codeText: '',
      language: ArrayUtils.isNotEmpty(allowedLanguages)
        ? allowedLanguages[0]
        : undefined,
      codeFile: undefined
    },
    onSubmit: (values, { setSubmitting }) => {
      const { language, codeText, codeFile } = values;
      const formData = new FormData();
      const submissionDTO = {
        problem: { id: problem.id },
        language
      };
      formData.append(
        'submissionDTO',
        new Blob([JSON.stringify(submissionDTO)], { type: 'application/json' })
      );

      if (codeFile) {
        formData.append('codeFile', codeFile);
      } else {
        formData.append('codeText', codeText);
      }

      SubmissionService.createSubmission(formData)
        .then(() => {
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
        });
    }
  });
  const { values, setFieldValue, handleSubmit, isSubmitting } = formik;

  return (
    <Form
      className={'clear-fix-container'}
      onSubmit={handleSubmit}
      loading={isSubmitting}
    >
      <Form.Field>
        <label>Bài làm</label>
        <CodeEditor
          style={{ maxHeight: 420 }}
          value={values.codeText}
          onBlur={(event, editor) => {
            setFieldValue('codeText', editor.getValue());
          }}
        />
      </Form.Field>
      <Form.Field>
        <label>Nộp file</label>
        <FileUploadInput
          file={values.codeFile}
          onChange={file => setFieldValue('codeFile', file)}
        />
      </Form.Field>
      <Form.Field>
        <label>Ngôn ngữ</label>
        <SubmissionLangInput
          problem={problem}
          value={values.language}
          onChange={lang => setFieldValue('language', lang)}
        />
      </Form.Field>
      <Form.Button type="submit" primary floated="right">
        Submit
      </Form.Button>
    </Form>
  );
};
