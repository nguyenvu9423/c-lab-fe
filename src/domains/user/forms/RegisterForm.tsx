import * as React from 'react';
import * as yup from 'yup';
import { Button, Form, Input } from 'semantic-ui-react';
import { FormikHelpers, useFormik } from 'formik';

import { useErrorMessageRenderer } from '../../../components';
import { RegisterService } from '../../../service/RegisterService';
import { ValidationException } from '../../../exception';

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
        <label>Username*</label>
        <Input
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessageRender('username')}
      </Form.Field>

      <Form.Group widths="equal">
        <Form.Field>
          <label>Password*</label>
          <Input
            placeholder="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('password')}
        </Form.Field>
        <Form.Field>
          <label>Confirm password*</label>
          <Form.Input
            placeholder="Confirm password"
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
          <label>First name*</label>
          <Input
            placeholder="First name"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('firstName')}
        </Form.Field>

        <Form.Field>
          <label>Last name*</label>
          <Input
            placeholder="Last name"
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
          <label>Birthday</label>
          <Input
            placeholder="Birthday"
            type="date"
            name="birthDay"
            value={values.birthDay}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('birthDay')}
        </Form.Field>
        <Form.Field>
          <label>Workplace</label>
          <Input
            placeholder="Workplace"
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
  username: yup
    .string()
    .required('Username is required')
    .min(8, 'Username should be at least 8 characters')
    .max(24, 'Username should be at most 24 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters')
    .max(24, 'Password should be at most 24 characters'),
  confirmPassword: yup
    .string()
    .required('Cofnirm password is required')
    .equals(
      [yup.ref('password')],
      'Confirm password is not match the password'
    ),
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name should be at least 2 characters')
    .max(24, 'First name should be at most 64 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name should be at least 2 characters')
    .max(24, 'Last name should be at most 64 characters'),
  email: yup.string().required('Email is required').email('Email is not valid'),
});
