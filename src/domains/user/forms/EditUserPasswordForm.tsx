import * as React from 'react';
import * as yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import { useErrorMessageRenderer } from '../../../components';

export namespace EditUserPasswordForm {
  export interface Props {
    initialValues?: Partial<Value>;
    onSubmit?(
      value: Value,
      helpers: FormikHelpers<Value>
    ): Promise<unknown> | void;
    onCancel?(): void;
  }

  export interface Value {
    newPassword: string;
    confirmNewPassword: string;
    oldPassword: string;
  }
}

export const EditUserPasswordForm: React.FC<EditUserPasswordForm.Props> = (
  props
) => {
  const { initialValues, onSubmit, onCancel } = props;

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik<EditUserPasswordForm.Value>({
    initialValues: {
      newPassword: initialValues?.newPassword ?? '',
      confirmNewPassword: initialValues?.confirmNewPassword ?? '',
      oldPassword: initialValues?.oldPassword ?? '',
    },
    onSubmit: (value, helpers) => onSubmit?.(value, helpers),
    validationSchema,
  });

  const errorMsgRenderer = useErrorMessageRenderer<EditUserPasswordForm.Value>({
    touched,
    errors,
  });

  return (
    <Form onSubmit={handleSubmit} error={true} loading={isSubmitting}>
      <Form.Field>
        <label>New password</label>
        <Form.Input
          name="newPassword"
          type="password"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMsgRenderer('newPassword')}
      </Form.Field>
      <Form.Field>
        <label>Confirm new password</label>
        <Form.Input
          name={'confirmNewPassword'}
          type="password"
          value={values.confirmNewPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMsgRenderer('confirmNewPassword')}
      </Form.Field>
      <Form.Field>
        <label>Old password</label>
        <Form.Input
          name="oldPassword"
          type="password"
          value={values.oldPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMsgRenderer('oldPassword')}
      </Form.Field>
      <Form.Field>
        <Button primary type="submit" floated="right">
          Submit
        </Button>
        {onCancel && (
          <Button type="button" floated="right" onClick={() => onCancel()}>
            Cancel
          </Button>
        )}
      </Form.Field>
    </Form>
  );
};

const validationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters')
    .max(24, 'Password should be at most 24 characters'),
  confirmNewPassword: yup
    .string()
    .required('Password is required')
    .equals([yup.ref('newPassword')], 'Confirm password must match'),
  oldPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters')
    .max(24, 'Password should be at most 24 characters'),
});
