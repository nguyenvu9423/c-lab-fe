import * as yup from 'yup';
import * as React from 'react';
import { FormErrorMessage } from '../../common/FormErrorMessage';
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
import { withFormik } from 'formik';
import { fetchAllCodeLanguages } from '../../../store/actions/code-language';
import { connect } from 'react-redux';
import { TestPackageService } from '../../../service/TestPackageService';
import { FileUploadInput } from '../../common/inputs/FileUploadInput';
import { BaseAddTestPackageForm } from './AddTestPackageForm';
import { ProblemService } from '../../../service/ProblemService';

function BaseAddProblemForm(props) {
  const {
    isValid,
    isSubmitting,
    values,
    setValues,
    setFieldValue,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    allowedLanguages,
    fetchAllCodeLanguages
  } = props;

  React.useEffect(() => {
    fetchAllCodeLanguages();
  }, []);

  const allowedLanguageOptions = React.useMemo(() => {
    return allowedLanguages.map(lang => ({
      key: lang.id,
      text: lang.title,
      value: lang.id
    }));
  }, [allowedLanguages]);

  const handleEditorBlur = React.useCallback((event, editor) =>
    setValues(
      {
        ...values,
        definition: editor.getData()
      },
      []
    )
  );

  const testPackageInputRef = React.useRef(null);

  const handleTestPackageChange = React.useCallback(event => {
    const { files } = event.target;
    if (files.length === 1) {
      const file = files[0];
      setFieldValue('testPackageFile', file);
    } else {
      setFieldValue('testPackageFile', undefined);
    }
  }, []);

  const ErrorMessage = React.useMemo(() => {
    return ({ name }) => {
      if (touched[name]) {
        if (errors[name]) return <FormErrorMessage content={errors[name]} />;
      }
      return null;
    };
  }, [errors, touched]);

  return (
    <>
      <Header as={'h2'} block attached="top">
        Create problem
      </Header>
      <Segment className="clear-fix-container" attached>
        <Header as={'h3'}>Details</Header>
        <Form onSubmit={handleSubmit} error={!isValid} loading={isSubmitting}>
          <Form.Group>
            <Form.Field width={4}>
              <label>Code</label>
              <Form.Input
                type="text"
                name="code"
                value={values.code}
                onBlur={handleBlur}
                onChange={handleChange}
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
            </Form.Field>
          </Form.Group>

          <Form.Field>
            <label>Definition</label>
            <CKEditor
              editor={Editor}
              data={values.definition}
              onBlur={handleEditorBlur}
            />
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
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Allowed languages</label>
            <Dropdown
              selection
              multiple
              fluid
              options={allowedLanguageOptions}
              value={values.allowedLanguages.map(item => item.id)}
              onChange={(event, data) => {
                setFieldValue(
                  'allowedLanguages',
                  data.value.map(item => ({
                    id: item
                  }))
                );
              }}
            />
          </Form.Field>
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
            </Form.Field>
            <Form.Field>
              <label>Output File Name</label>
              <Form.Input
                type="text"
                name="activeTestPackage.outputFileName"
                value={values.activeTestPackage.outputFileName}
                onChange={handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <FileUploadInput
              ref={testPackageInputRef}
              onChange={handleTestPackageChange}
              file={values.testPackageFile}
            />
          </Form.Field>
          <Form.Button type="submit" floated="right" primary>
            Submit
          </Form.Button>
        </Form>
      </Segment>
    </>
  );
}

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .required('Problem code is required')
    .min(3, 'Problem code sould be at least 3 characters')
});

export const AddProblemForm = connect(
  state => {
    const codeLanguageSet = state.entities.codeLanguage;
    return {
      allowedLanguages: Object.values(codeLanguageSet)
    };
  },
  {
    fetchAllCodeLanguages: fetchAllCodeLanguages.request
  }
)(
  withFormik({
    mapPropsToValues: props => {
      const { initialProblem } = props;
      if (initialProblem) {
        return initialProblem;
      }
      return {
        code: '',
        title: '',
        definition: '',
        timeLimit: '',
        memoryLimit: '',
        activeTestPackage: {
          inputFileName: '',
          outputFileName: ''
        },
        allowedLanguages: [],
        testPackageFile: undefined
      };
    },
    validationSchema,
    handleSubmit: (values, bag) => {
      const { testPackageFile, ...problemDTO } = values;
      const {
        props: { onSubmitSuccess },
        setSubmitting
      } = bag;
      const formData = new FormData();
      formData.append('testPackageFile', testPackageFile);
      const problemDTOBlob = new Blob([JSON.stringify(problemDTO)], {
        type: 'application/json'
      });
      formData.append('problemDTO', problemDTOBlob);
      setSubmitting(true);
      ProblemService.create(formData)
        .then(response => {
          const { data } = response;
          setSubmitting(false);
          if (onSubmitSuccess) onSubmitSuccess(data);
        })
        .catch(e => {
          setSubmitting(false);
        });
    }
  })(BaseAddProblemForm)
);
