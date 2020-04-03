import * as React from 'react';
import * as yup from 'yup';
import {
  Segment,
  Form,
  Header,
  Input,
  Button,
  Dropdown,
  Table,
  Checkbox
} from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Editor } from '../../common/Editor';
import { withFormik, useFormik } from 'formik';
import { useHistory } from 'react-router';
import { fetchAllCodeLanguages } from '../../../store/actions/code-language';
import { connect } from 'react-redux';
import { TestPackageService } from '../../../service/TestPackageService';
import { FileUploadInput } from '../../common/inputs/FileUploadInput';
import { BaseAddTestPackageForm } from './AddTestPackageForm';
import { ProblemService } from '../../../service/ProblemService';
import { useCodeLanguageSelect } from '../../../domains/code-language';
import { useFormErrorMessage } from '../../../components/form';
import { useTagSelect } from '../../../domains/tag';
import { ExceptionTypes } from '../../../exception/ExceptionTypes';

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .matches(
      /^[A-Z0-9]*$/,
      'Code should only contain uppercase letters and numbers'
    )
    .required('Code is required')
    .min(3, 'Code should be at least 3 characters')
    .max(12, 'Code shoud be at most 12 characters'),
  title: yup
    .string()
    .strict()
    .trim('Title should not contain leading and trailing whitespace')
    .required('Title is required')
    .min(3, 'Title should be at least 3 characters')
    .max(64, 'Title should be at most 64 characters'),
  definition: yup
    .string()
    .required('Definition is required')
    .max(640000, 'Definition should only contain 64000 characters'),
  activeTestPackage: yup
    .mixed()
    .required('At least one test package should be chosen for this problem'),
  timeLimit: yup
    .number()
    .required('Time limit should be defined')
    .min(1, 'Timelimit should be greater than 0ms')
    .max(20000, 'Timelimit shoud be less than 20000ms'),
  memoryLimit: yup
    .number()
    .required('Memory limit should be defined')
    .min(1, 'Memorylimit should be greater than 32mb')
    .max(20000, 'Memorylimit should be less than 1024mb'),
  allowedLanguages: yup
    .array()
    .min(1, 'At least one languages should be defined'),
  activeTestPackage: yup.object().shape({
    inputFileName: yup.string().required('Input file name is required'),
    outputFileName: yup.string().required('Output file name is required')
  }),
  testPackageFile: yup.mixed().required('Test package file is required')
});

export function AddProblemForm(props) {
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
    isValid,
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
      activeTestPackage: {
        inputFileName: '',
        outputFileName: ''
      },
      testPackageFile: undefined
    },
    initialStatus: {
      errors: {}
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      const { testPackageFile, ...problemDTO } = values;
      const formData = new FormData();
      formData.append('testPackageFile', testPackageFile);
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
  } = useCodeLanguageSelect();

  const handleEditorBlur = React.useCallback(
    (event, editor) => setFieldValue('definition', editor.getData()),
    []
  );

  const handleTestPackageChange = React.useCallback(event => {
    const { files } = event.target;
    if (files.length === 1) {
      const file = files[0];
      setFieldValue('testPackageFile', file);
    } else {
      setFieldValue('testPackageFile', undefined);
    }
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

          <Header as={'h3'}>Testcases</Header>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Input File Name</label>
              <Form.Input
                type="text"
                name="activeTestPackage.inputFileName"
                value={values.activeTestPackage.inputFileName}
                onChange={handleChange}
              />
              <ErrorMessage name="activeTestPackage.inputFileName" />
            </Form.Field>
            <Form.Field>
              <label>Output File Name</label>
              <Form.Input
                type="text"
                name="activeTestPackage.outputFileName"
                value={values.activeTestPackage.outputFileName}
                onChange={handleChange}
              />
              <ErrorMessage name="activeTestPackage.outputFileName" />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <FileUploadInput
              onChange={handleTestPackageChange}
              file={values.testPackageFile}
            />
            <ErrorMessage name="testPackageFile" />
          </Form.Field>
          <Form.Button type="submit" floated="right" primary>
            Submit
          </Form.Button>
        </Form>
      </Segment>
    </>
  );
}
