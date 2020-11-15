import * as React from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import { FileUploadInput } from '../../common/inputs/FileUploadInput';
import { useFormik } from 'formik';
import ArrayUtils from '../../../utility/ArrayUtils';
import { SubmissionService } from '../../../service/SubmissionService';
import { SubmissionLangInput } from '../../submission/components/SubmissionLangInput';

export function CompactCodeSubmissionForm(props) {
  const { problem, onSubmitDone } = props;
  const formik = useFormik({
    initialValues: {
      language: undefined,
      codeFile: undefined
    },
    onSubmit: (values, { setSubmitting }) => {
      const { language, codeFile } = values;
      const formData = new FormData();
      const submissionDTO = {
        problem: { id: problem.id },
        language
      };
      formData.append(
        'submissionDTO',
        new Blob([JSON.stringify(submissionDTO)], { type: 'application/json' })
      );
      formData.append('codeFile', codeFile);
      setSubmitting(true);
      SubmissionService.createSubmissionByFile(formData)
        .then(response => {
          setSubmitting(false);
          onSubmitDone?.(response.data);
        })
        .catch(() => {
          setSubmitting(false);
        });
    }
  });
  const { values, handleSubmit, setFieldValue, isSubmitting } = formik;

  React.useEffect(() => {
    if (!ArrayUtils.isEmpty(problem.allowedLanguages)) {
      setFieldValue('language', problem.allowedLanguages[0]);
    }
  }, [problem.allowedLanguages]);

  return (
    <>
      <Header as="h3" attached="top">
        Nộp bài
      </Header>
      <Segment attached>
        <Form
          className="clear-fix-container"
          onSubmit={handleSubmit}
          loading={isSubmitting}
        >
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
              onChange={lang => {
                setFieldValue('language', lang);
              }}
            />
          </Form.Field>
          <Form.Button type="submit" primary>
            Gửi
          </Form.Button>
        </Form>
      </Segment>
    </>
  );
}
