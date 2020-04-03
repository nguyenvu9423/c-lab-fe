import * as React from 'react';
import { Form } from 'semantic-ui-react';
import { FileUploadInput } from '../../common/inputs/FileUploadInput';
import { useSelector } from 'react-redux';
import { ProblemSelectors } from '../../../store/selectors';
import { CodeLanguageInput } from '../../submission/components/CodeLanguageInput';
import { useFormik } from 'formik';
import ArrayUtils from '../../../utility/ArrayUtils';
import { UserSelectors } from '../../../store/selectors/UserSelectors';
import { SubmissionService } from '../../../service/SubmissionService';
import { CodeEditor } from '../../../components/editors';

export const CodeSubmissionForm = props => {
  const { problemId } = props;
  const problem = useSelector(ProblemSelectors.byId(problemId));
  const loginUser = useSelector(UserSelectors.loginUser());

  const { allowedLanguages } = problem;
  const formik = useFormik({
    initialValues: {
      codeText: '',
      usedLanguage: ArrayUtils.isNotEmpty(allowedLanguages)
        ? allowedLanguages[0]
        : undefined
    },
    onSubmit: (values, { setSubmitting }) => {
      const { usedLanguage, codeText } = values;
      const formData = new FormData();
      const submissionDTO = {
        submittingUser: loginUser,
        targetProblem: { id: problemId },
        usedLanguage
      };
      formData.append(
        'submissionDTO',
        new Blob([JSON.stringify(submissionDTO)], { type: 'application/json' })
      );
      formData.append('codeText', codeText);      
      SubmissionService.createSubmission(formData)
        .then(() => {
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
        });
    }
  });
  if (!problem) return null;
  if (!loginUser) return null;
  const { values, setFieldValue, handleSubmit, isSubmitting } = formik;
  return (
    <Form onSubmit={handleSubmit} loading={isSubmitting}>
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
        <FileUploadInput />
      </Form.Field>
      <Form.Field>
        <label>Ngôn ngữ</label>
        <CodeLanguageInput
          options={problem.allowedLanguages}
          value={values.usedLanguage}
        />
      </Form.Field>
      <Form.Button type="submit" primary>
        Gửi
      </Form.Button>
    </Form>
  );
};
