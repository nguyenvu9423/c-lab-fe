import * as React from 'react';
import * as yup from 'yup';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { CancelButton, SubmitButton } from '../../components/button';
import { FieldError } from '../../exception';
import { useErrorMessageRenderer } from '../../components';
import { Tag } from './Tag';

export namespace TagForm {
  export interface Props {
    initialValues?: Partial<Value>;
    onCancel: () => void;
    onSubmit: (values: Value) => Promise<unknown>;
    status?: {
      errors?: FieldError[];
    };
  }

  export type Value = Omit<Tag, 'id'>;
}

export const TagFormSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^[a-z0-9_]*$/,
      'Name should contains only lower characters, numbers'
    )
    .min(3, 'Name should contains at least 3 characters')
    .max(24, 'Name should contains 24 characters at maximum'),
});

export const TagForm: React.FC<TagForm.Props> = (props) => {
  const { onCancel, onSubmit, status } = props;
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik<TagForm.Value>({
    initialValues: {
      name: props.initialValues?.name ?? '',
    },
    validationSchema: TagFormSchema,
    onSubmit: (values) => onSubmit?.(values),
  });
  const errorMsgRenderer = useErrorMessageRenderer({ errors, touched, status });

  return (
    <Form
      className="clear-fix-container"
      error={true}
      loading={isSubmitting}
      onSubmit={handleSubmit}
    >
      <Form.Input
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errorMsgRenderer('name')}
      <SubmitButton floated="right" />
      <CancelButton floated="right" onClick={() => onCancel?.()} />
    </Form>
  );
};
