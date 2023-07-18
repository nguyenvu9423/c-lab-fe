import * as React from 'react';
import * as yup from 'yup';
import { Button, Form, Input } from 'semantic-ui-react';
import { FormikHelpers, useFormik } from 'formik';

import { useErrorMessageRenderer } from '../../../components';
import { RegisterService } from '../../../services/RegisterService';
import { ValidationException } from '../../../shared/exceptions';
import { UserFieldSchemas } from './UserFormSchemas';

export namespace RegisterForm {
  export interface Props {
    onSuccess?(): void;
  }
}

export const RegisterForm: React.FC<RegisterForm.Props> = (props) => {
  const { onSuccess } = props;

  const onSubmit = React.useCallback(
    (
      values: BaseRegisterForm.Value,
      helpers: FormikHelpers<BaseRegisterForm.Value>
    ) => {
      return RegisterService.register(values)
        .then(() => onSuccess?.())
        .catch((e) => {
          if (ValidationException.isInstance(e)) {
            helpers.setErrors(ValidationException.convertToFormikErrors(e));
          }
        });
    },
    [onSuccess]
  );
  return <BaseRegisterForm onSubmit={onSubmit} />;
};

export namespace BaseRegisterForm {
  export interface Props {
    initialValues?: Partial<Value>;
    onSubmit?(value: Value, helpers: FormikHelpers<Value>): void;
  }

  export interface Value {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDay: string;
    workplace: string;
  }

  export interface FormValue extends Value {
    confirmPassword: string;
  }
}

export const BaseRegisterForm: React.FC<BaseRegisterForm.Props> = (props) => {
  const { onSubmit } = props;

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik<BaseRegisterForm.FormValue>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDay: '',
      workplace: '',
    },
    validationSchema,
    onSubmit: (value, helpers) => onSubmit?.(value, helpers),
  });

  const errorMessageRender = useErrorMessageRenderer({ touched, errors });

  return (
    <Form onSubmit={handleSubmit} error={true} loading={isSubmitting}>
      <Form.Field>
        <label>Tên đăng nhập*</label>
        <Input
          placeholder="Tên đăng nhập"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessageRender('username')}
      </Form.Field>

      <Form.Group widths="equal">
        <Form.Field>
          <label>Mật khẩu*</label>
          <Input
            placeholder="Mật khẩu"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('password')}
        </Form.Field>
        <Form.Field>
          <label>Xác nhận mật khẩu*</label>
          <Form.Input
            placeholder="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('confirmPassword')}
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field>
          <label>Tên*</label>
          <Input
            placeholder="Tên"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('firstName')}
        </Form.Field>

        <Form.Field>
          <label>Họ*</label>
          <Input
            placeholder="Họ"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('lastName')}
        </Form.Field>
      </Form.Group>

      <Form.Field>
        <label>Email*</label>
        <Input
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessageRender('email')}
      </Form.Field>

      <Form.Group widths={'equal'}>
        <Form.Field>
          <label>Ngày sinh</label>
          <Input
            placeholder="Ngay sinh"
            type="date"
            name="birthDay"
            value={values.birthDay}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('birthDay')}
        </Form.Field>
        <Form.Field>
          <label>Nơi làm việc</label>
          <Input
            placeholder="Nơi làm việc"
            name="workplace"
            value={values.workplace}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        {errorMessageRender('workplace')}
      </Form.Group>
      {onSubmit && (
        <Button primary type="submit" floated="right">
          Submit
        </Button>
      )}
    </Form>
  );
};

const validationSchema = yup.object().shape({
  username: UserFieldSchemas.username,
  password: UserFieldSchemas.password,
  confirmPassword: yup
    .string()
    .required('Vui lòng điền mật khẩu xác nhận')
    .equals([yup.ref('password')], 'Mật khẩu xác nhận không trùng khớp'),
  firstName: UserFieldSchemas.firstName,
  lastName: UserFieldSchemas.lastName,
  email: UserFieldSchemas.email,
  workplace: UserFieldSchemas.workplace,
});
