import * as React from 'react';
import {
  Segment,
  Form,
  Header,
  Input,
  Dropdown,
  Divider
} from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Editor } from '../../../page/common/Editor';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import { FileUploadInput } from '../../../page/common/inputs/FileUploadInput';
import { ProblemService } from '../../../service/ProblemService';
import { useSubmissionLangSelect } from '../../submission-lang';
import { useFormErrorMessage } from '../../../components/form';
import { useTagSelect } from '../../tag';
import { ExceptionTypes } from '../../../exception/ExceptionTypes';
import { addProblemValidationSchema } from './Schemas';
import { judgerOptions, Judger } from '../../judge-config';

export function AddProblemForm() {
  const history = useHistory();
  const {
    values,
    status,
    setStatus,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    isSubmitting
  } = useFormik({
    initialValues: {
      code: '',
      title: '',
      definition: '',
      timeLimit: 2000,
      memoryLimit: 256,
      allowedLanguages: [],
      tags: [],
      activeJudgeConfig: {
        judger: judgerOptions[0].value,
        inputFileName: '',
        outputFileName: '',
        testPackageFile: undefined,
        externalJudger: undefined
      }
    },
    initialStatus: {
      errors: {}
    },
    validationSchema: addProblemValidationSchema,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      const problemDTO = { ...values };
      const activeJudgeConfig = { ...values.activeJudgeConfig };

      const formData = new FormData();

      formData.append('testPackageFile', activeJudgeConfig.testPackageFile);
      formData.append('externalJudger', activeJudgeConfig.externalJudger);

      activeJudgeConfig.testPackageFile = undefined;
      activeJudgeConfig.externalJudger = undefined;

      if (activeJudgeConfig.judger === Judger.EXTERNAL) {
        activeJudgeConfig.outputFileName = null;
      }

      problemDTO.activeJudgeConfig = activeJudgeConfig;
      const problemDTOBlob = new Blob([JSON.stringify(problemDTO)], {
        type: 'application/json'
      });
      formData.append('problemDTO', problemDTOBlob);

      ProblemService.create(formData)
        .then(response => {
          setSubmitting(false);
          const { data } = response;
          history.push(data.code);
        })
        .catch(ex => {
          setSubmitting(false);
          if (ex.response) {
            const errors = {};
            const body = ex.response.data;
            if (body.type === ExceptionTypes.INVALID_FORM) {
              body.errors.forEach(error => {
                errors[error.field] = error.defaultMessage;
              });
              setStatus({ errors });
            }
          }
        });
    }
  });
  const {
    languageOptions,
    mapLanguageToValue,
    mapValueToLanguage
  } = useSubmissionLangSelect();

  const handleEditorBlur = React.useCallback(
    (event, editor) => setFieldValue('definition', editor.getData()),
    []
  );

  const handleTestPackageChange = React.useCallback(event => {
    const { files } = event.target;
    setFieldValue(
      'activeJudgeConfig.testPackageFile',
      files.length === 1 ? files[0] : undefined
    );
  }, []);

  const handleExternalJudgerChange = React.useCallback(event => {
    const { files } = event.target;
    setFieldValue(
      'activeJudgeConfig.externalJudger',
      files.length === 1 ? files[0] : undefined
    );
  }, []);

  const handleCodeChange = React.useCallback(
    (event, data) => {
      setFieldValue('code', data.value.toUpperCase());
      setStatus({
        ...status,
        errors: { ...status.errors, ['code']: null }
      });
    },
    [setFieldValue, setStatus, status]
  );

  const isJudgerExternal = values.activeJudgeConfig.judger === Judger.EXTERNAL;

  const {
    tagOptions,
    mapTagToValue,
    mapValueToTag,
    isFetchingTags,
    handleTagSearchChange,
    handleAddOption
  } = useTagSelect(values.tags);

  const ErrorMessage = useFormErrorMessage(touched, errors, status);

  return (
    <>
      <Header as={'h2'} block attached="top">
        Create problem
      </Header>
      <Segment className="clear-fix-container" attached>
        <Header as={'h3'}>Details</Header>
        <Form onSubmit={handleSubmit} error={true} loading={isSubmitting}>
          <Form.Group>
            <Form.Field width={4}>
              <label>Code</label>
              <Form.Input
                type="text"
                name="code"
                value={values.code}
                onBlur={handleBlur}
                onChange={handleCodeChange}
              />
              <ErrorMessage name="code" />
            </Form.Field>
            <Form.Field width={12}>
              <label>Title</label>
              <Form.Input
                type="text"
                name="title"
                value={values.title}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="title" />
            </Form.Field>
          </Form.Group>

          <Form.Field>
            <label>Definition</label>
            <CKEditor
              editor={Editor}
              data={values.definition}
              onBlur={handleEditorBlur}
            />
            <ErrorMessage name="definition" />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Time limit</label>
              <Input
                type="number"
                name="timeLimit"
                label="ms"
                labelPosition="right"
                value={values.timeLimit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="timeLimit" />
            </Form.Field>
            <Form.Field>
              <label>Memory limit</label>
              <Input
                type="number"
                name="memoryLimit"
                label="mb"
                labelPosition="right"
                value={values.memoryLimit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="memoryLimit" />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Allowed languages</label>
              <Dropdown
                selection
                multiple
                fluid
                options={languageOptions}
                value={values.allowedLanguages.map(mapLanguageToValue)}
                onChange={(event, data) => {
                  setFieldValue(
                    'allowedLanguages',
                    data.value.map(mapValueToLanguage)
                  );
                }}
              />
              <ErrorMessage name="allowedLanguages" />
            </Form.Field>
            <Form.Field>
              <label>Tags</label>
              <Dropdown
                selection
                multiple
                search
                fluid
                allowAdditions
                loading={isFetchingTags}
                options={tagOptions}
                value={values.tags.map(mapTagToValue)}
                onSearchChange={(event, { searchQuery }) => {
                  handleTagSearchChange(searchQuery);
                }}
                onAddItem={(event, { value }) => {
                  handleAddOption(value);
                }}
                onChange={(event, data) => {
                  setFieldValue('tags', data.value.map(mapValueToTag));
                }}
              />
            </Form.Field>
          </Form.Group>

          <Header as={'h3'}>Judge config</Header>
          <Form.Group>
            <Form.Field width={8}>
              <label>Judger</label>
              <Form.Select
                compact
                name={'activeJudgeConfig.judger'}
                value={values.activeJudgeConfig.judger}
                options={judgerOptions}
                onChange={(e, { value }) =>
                  setFieldValue('activeJudgeConfig.judger', value)
                }
              />
            </Form.Field>
            {isJudgerExternal && (
              <Form.Field width={8}>
                <label>External executable judger</label>
                <FileUploadInput
                  onChange={handleExternalJudgerChange}
                  file={values.activeJudgeConfig.externalJudger}
                />
                <ErrorMessage name="activeJudgeConfig.externalJudger" />
              </Form.Field>
            )}
          </Form.Group>
          <Divider />
          <Form.Group>
            <Form.Field width={8}>
              <label>Testcases</label>
              <FileUploadInput
                onChange={handleTestPackageChange}
                file={values.activeJudgeConfig.testPackageFile}
              />
              <ErrorMessage name="activeJudgeConfig.testPackageFile" />
            </Form.Field>
            <Form.Field width={isJudgerExternal ? 8 : 4}>
              <Form.Input
                label="Input File Name"
                type="text"
                name="activeJudgeConfig.inputFileName"
                value={values.activeJudgeConfig.inputFileName}
                onChange={handleChange}
              />
              <ErrorMessage name="activeJudgeConfig.inputFileName" />
            </Form.Field>
            {!isJudgerExternal && (
              <Form.Field width={4}>
                <Form.Input
                  label="Output File Name"
                  type="text"
                  name="activeJudgeConfig.outputFileName"
                  value={values.activeJudgeConfig.outputFileName}
                  onChange={handleChange}
                />
                <ErrorMessage name="activeJudgeConfig.outputFileName" />
              </Form.Field>
            )}
          </Form.Group>
          <Form.Button type="submit" floated="right" primary>
            Submit
          </Form.Button>
        </Form>
      </Segment>
    </>
  );
}
