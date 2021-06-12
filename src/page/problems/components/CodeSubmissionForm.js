import * as React from 'react';
import { Form } from 'semantic-ui-react';
import { FileUploadInput } from '../../common/inputs/FileUploadInput';
import { SubmissionLangInput } from '../../submission/components';
import { useFormik } from 'formik';
import { SubmissionService } from '../../../service/SubmissionService';
import { CodeEditor } from '../../../components/editors';

export const CodeSubmissionForm = props => {
  const { problem, onSuccess } = props;

  const formik = useFormik({
    initialValues: {
      language: problem.allowedLanguages[0],
      codeText: '',
      codeFile: undefined
    },
    onSubmit: (values, { setSubmitting }) => {
      const { language, codeText, codeFile } = values;
      SubmissionService.submit({
        problemId: problem.id,
        languageName: language.name,
        codeFile,
        codeText
      })
        .then(({ data }) => {
          setSubmitting(false);
          console.log(data);
          onSuccess?.(data);
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
          onBlur={(event, editor) =>
            setFieldValue('codeText', editor.getValue())
          }
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
