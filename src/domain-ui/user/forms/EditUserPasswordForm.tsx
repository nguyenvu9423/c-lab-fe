import * as React from 'react';
import * as yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import { Button, Form } from 'semantic-ui-react';
import { useErrorMessageRenderer } from '../../../components';
import { UserFieldSchemas } from './UserFormSchemas';

export namespace EditUserPasswordForm {
  export interface Props {
    initialValues?: Partial<Value>;
    onSubmit?(
      value: Value,
      helpers: FormikHelpers<Value>,
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
  props,
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
        <label>Mật khẩu mới</label>
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
        <label>Xác nhận mật khẩu mới</label>
        <Form.Input
          name="confirmNewPassword"
          type="password"
          value={values.confirmNewPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMsgRenderer('confirmNewPassword')}
      </Form.Field>
      <Form.Field>
        <label>Mật khẩu hiện tại</label>
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
          Lưu
        </Button>
        {onCancel && (
          <Button type="button" floated="right" onClick={() => onCancel()}>
            Hủy
          </Button>
        )}
      </Form.Field>
    </Form>
  );
};

const validationSchema = yup.object().shape({
  newPassword: UserFieldSchemas.password,
  confirmNewPassword: yup
    .string()
    .required('Vui lòng điền mật khẩu xác nhận')
    .equals([yup.ref('newPassword')], 'Mật khẩu xác nhận không phù hợp'),
  oldPassword: yup.string().required('Vui lòng điền mật khẩu hiện tại'),
});
