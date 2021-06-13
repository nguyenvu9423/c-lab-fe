import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Modal, Form, Button, Message } from 'semantic-ui-react';
import { FileUploadInput } from '../../common/inputs/FileUploadInput';
import { JudgeConfigService } from '../../../service/JudgeConfigService';
import { normalize } from 'normalizr';
import { updateEntity } from '../../../store/actions/entity';
import { judgeConfigSchema } from '../../../entity-schemas/judgeConfigSchema';
import {
  useFormErrorMessage,
  useErrorMessageRenderer,
} from '../../../components/form';
import { ExceptionTypes } from '../../../exception/ExceptionTypes';

const validationSchema = yup.object().shape({
  inputFileName: yup.string().required('Input file name is required'),
  outputFileName: yup.string().required('Output file name is required'),
  testPackageFile: yup.mixed().required('Test package is required'),
});

export function AddJudgeConfigForm(props) {
  const { problem, onClose, onSubmitSuccess } = props;
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      inputFileName: '',
      outputFileName: '',
      owningProblemId: problem.id,
      testPackageFile: undefined,
    },
    initialStatus: {
      errors: {},
      globalError: undefined,
    },
    validationSchema,
    onSubmit: (values, bag) => {
      const { setSubmitting, setStatus } = bag;
      const formData = new FormData();
      const judgeConfigBlob = new Blob([JSON.stringify(values)], {
        type: 'application/json',
      });
      formData.append('judgeConfig', judgeConfigBlob);
      formData.append('file', values.testPackageFile);
      JudgeConfigService.create(formData)
        .then((res) => {
          const { data } = res;
          const normalizedData = normalize(data, judgeConfigSchema);
          dispatch(updateEntity(normalizedData.entities));
          updateEntity(normalizedData.entities);
          setSubmitting(false);
          onSubmitSuccess();
        })
        .catch((e) => {
          setSubmitting(false);
          if (e.response) {
            const { data } = e.response;
            if (data.type === ExceptionTypes.INVALID_FORM) {
              let errors = {};
              data.errors.forEach((error) => {
                errors[error.field] = error.defaultMessage;
              });
              setStatus({ errors, globalError: undefined });
            } else if (data.type === ExceptionTypes.UPLOAD_FILE_EXCEPTION) {
              setStatus({ errors: {}, globalError: data.message });
            }
          }
        });
    },
  });
  const {
    values,
    touched,
    status,
    errors,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    setStatus,
    handleSubmit,
    isSubmitting,
  } = formik;

  const handleChange = React.useCallback(
    (event, data) => {
      setFieldValue(data.name, data.value);
      setStatus({
        errors: { ...status.errors, [data.name]: undefined },
        globalError: undefined,
      });
    },
    [setFieldValue, setStatus, status]
  );

  const handleTestPackageFileChange = React.useCallback(
    (event) => {
      const { files, name } = event.target;
      setFieldTouched(name);
      if (files.length === 1) {
        const file = files[0];
        setFieldValue(name, file);
      } else {
        setFieldValue(name, undefined);
      }
    },
    [setFieldValue]
  );

  const errorMessageRenderer = useErrorMessageRenderer({
    touched,
    errors,
    status,
  });

  return (
    <Modal open>
      <Modal.Header>Upload bộ test</Modal.Header>
      <Modal.Content>
        <Form
          id={'add-judgeconfig-form'}
          error
          onSubmit={handleSubmit}
          loading={isSubmitting}
        >
          {status.globalError && (
            <Message error header="Error" content={status.globalError} />
          )}
          <Form.Group widths="equal">
            <Form.Field>
              <label>Tên input file</label>
              <Form.Input
                type="text"
                name="inputFileName"
                value={values.inputFileName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errorMessageRenderer('inputFileName')}
            </Form.Field>
            <Form.Field>
              <label>Tên output file</label>
              <Form.Input
                type="text"
                name="outputFileName"
                value={values.outputFileName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errorMessageRenderer('outputFileName')}
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Tệp</label>
            <FileUploadInput
              file={values.testPackageFile}
              name="testPackageFile"
              onChange={handleTestPackageFileChange}
            />
            {errorMessageRenderer('testPackageFile')}
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button type="button" onClick={() => onClose()} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button
          primary
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Lưu
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
