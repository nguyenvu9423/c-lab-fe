import * as React from 'react';
import { Form, Header, Segment } from 'semantic-ui-react';
import { updateEntity } from '../../../store/actions/entity';
import { FileUploadInput } from '../../common/inputs/FileUploadInput';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { UserSelectors } from '../../../store/selectors/UserSelectors';
import ArrayUtils from '../../../utility/ArrayUtils';
import { SubmissionService } from '../../../service/SubmissionService';
import { normalize } from 'normalizr';
import { submissionSchema } from '../../../entity-schemas/submissionSchema';
import { ProblemSelectors } from '../../../store/selectors';
import { CodeLanguageInput } from '../../submission/components/CodeLanguageInput';
import { createSubmission } from '../../../store/actions/submission';

export function CompactCodeSubmissionForm(props) {
  const { problemId } = props;
  const problem = useSelector(ProblemSelectors.byId(problemId));
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      usedLanguage: undefined,
      codeFile: undefined
    },
    onSubmit: (values, { setSubmitting }) => {
      const { usedLanguage, codeFile } = values;
      const formData = new FormData();
      const submissionDTO = {
        targetProblem: { id: problem.id },
        usedLanguage
      };
      formData.append(
        'submissionDTO',
        new Blob([JSON.stringify(submissionDTO)], { type: 'application/json' })
      );
      formData.append('codeFile', codeFile);
      setSubmitting(true);
      dispatch(createSubmission.request());
      SubmissionService.createSubmissionByFile(formData)
        .then(response => {
          setSubmitting(false);
          const { data } = response;
          const normalizedData = normalize(data, submissionSchema);
          dispatch(updateEntity(normalizedData.entities));
          dispatch(createSubmission.response(normalizedData.result));
        })
        .catch(() => {
          setSubmitting(false);
        });
    }
  });
  const { values, handleSubmit, setFieldValue, isSubmitting } = formik;
  const submissionInputRef = React.useRef(null);
  const onChange = React.useCallback(event => {
    const { files } = event.target;
    if (files.length == 1) {
      setFieldValue('codeFile', files[0]);
    }
  }, []);

  React.useEffect(() => {
    if (!ArrayUtils.isEmpty(problem.allowedLanguages)) {
      setFieldValue('usedLanguage', problem.allowedLanguages[0]);
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
              ref={submissionInputRef}
              onChange={onChange}
              file={values.codeFile}
            />
          </Form.Field>
          <Form.Field>
            <CodeLanguageInput
              options={problem.allowedLanguages}
              value={values.usedLanguage}
              onChange={lang => {
                setFieldValue('usedLanguage', lang);
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
