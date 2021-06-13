import * as React from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { CancelButton, SubmitButton } from '../../components/button';

export function TagForm(props) {
  const { initialValues, onCancel, onSubmit } = props;
  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues
      ? initialValues
      : {
          name: '',
        },
    onSubmit: (values) => onSubmit?.(values),
  });
  return (
    <Form
      className="clear-fix-container"
      loading={props.isSubmitting}
      onSubmit={handleSubmit}
    >
      <Form.Input
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <SubmitButton floated="right" />
      <CancelButton floated="right" onClick={() => onCancel?.()} />
    </Form>
  );
}
