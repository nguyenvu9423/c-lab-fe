import * as React from 'react';
import * as yup from 'yup';
import { withFormik, useFormik } from 'formik';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'semantic-ui-react';
import { FileUploadInput } from '../../common/inputs/FileUploadInput';
import { TestPackageService } from '../../../service/TestPackageService';
import { normalize } from 'normalizr';
import { updateEntity } from '../../../store/actions/entity';
import { testPackageDTOSchema } from '../../../entity-schemas/testPackageDTOSchema';

const validationSchema = yup.object().shape({
  inputFileName: yup.string().required("Input file name is required")
});

export function A ddTestPackageForm(props) {
  const {} = useFormik({
    initialValues: {
      inputFileName: '',
      outputFileName: '',
      testPackageFile: undefined
    }, 
    
  });
  const {
    isOpen,
    isSubmitting,
    onClose,
    handleSubmit,
    values,
    handleChange,
    setFieldValue
  } = props;
  const fileInputRef = React.useRef(null);
  const handleTestPackageChange = React.useCallback(event => {
    const { files } = event.target;
    if (files.length === 1) {
      const file = files[0];
      setFieldValue('testPackageFile', file);
    } else {
      setFieldValue('testPackageFile', undefined);
    }
  }, []);
  return (
    <Modal open={isOpen}>
      <Modal.Header>Upload bộ test</Modal.Header>
      <Modal.Content>
        <Form
          id={'add-testpackage-form'}
          onSubmit={handleSubmit}
          loading={isSubmitting}
        >
          <Form.Group widths="equal">
            <Form.Field>
              <label>Tên input file</label>
              <Form.Input
                type="text"
                name="inputFileName"
                value={values.inputFileName}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Tên output file</label>
              <Form.Input
                type="text"
                name="outputFileName"
                value={values.outputFileName}
                onChange={handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Tệp</label>
            <FileUploadInput
              ref={fileInputRef}
              file={values.testPackageFile}
              onChange={handleTestPackageChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button type="button" onClick={() => onClose()} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button
          positive={true}
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

// export const AddTestPackageForm = connect(
//   undefined,
//   {
//     updateEntity
//   }
// )(
//   withFormik({
//     mapPropsToValues: props => {
//       return {
//         inputFileName: '',
//         outputFileName: '',
//         testPackageFile: undefined
//       };
//     },
//     handleSubmit: (values, bag) => {
//       const {
//         props: { problem, updateEntity, onClose },
//         setSubmitting
//       } = bag;
//       const { inputFileName, outputFileName } = values;
//       const formData = new FormData();
//       const testPackageBlob = new Blob(
//         [
//           JSON.stringify({
//             owningProblemId: problem.id,
//             inputFileName,
//             outputFileName
//           })
//         ],
//         {
//           type: 'application/json'
//         }
//       );
//       formData.append('testPackage', testPackageBlob);
//       formData.append('file', values.testPackageFile);
//       setSubmitting(true);
//       TestPackageService.create(formData).then(res => {
//         const { data } = res;
//         const normalizedData = normalize(data, testPackageDTOSchema);
//         updateEntity(normalizedData.entities);
//         setSubmitting(false);
//         onClose();
//       });
//     }
//   })(BaseAddTestPackageForm)
// );
