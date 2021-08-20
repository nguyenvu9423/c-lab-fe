import * as React from 'react';
import * as yup from 'yup';
import { Button, Form, Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useErrorMessageRenderer } from '../../../components';

export namespace UserInfoForm {
  export interface Props {
    initialValues?: Partial<Value>;
    onSubmit?(value: Value): Promise<unknown> | void;
    onCancel?(): void;
  }
  export interface Value {
    firstName: string;
    lastName: string;
    email: string;
    birthDay: string;
    workplace: string;
  }
}

export const UserInfoForm: React.FC<UserInfoForm.Props> = (props) => {
  const { initialValues, onSubmit, onCancel } = props;

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik<UserInfoForm.Value>({
    initialValues: {
      firstName: initialValues?.firstName ?? '',
      lastName: initialValues?.lastName ?? '',
      email: initialValues?.email ?? '',
      birthDay: initialValues?.birthDay ?? '',
      workplace: initialValues?.workplace ?? '',
    },
    onSubmit: (value) => onSubmit?.(value),
    validationSchema,
  });

  const errorMsgRenderer = useErrorMessageRenderer<UserInfoForm.Value>({
    touched,
    errors,
  });

  return (
    <Form onSubmit={handleSubmit} error={true} loading={isSubmitting}>
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
          {errorMsgRenderer('firstName')}
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
          {errorMsgRenderer('lastName')}
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
      </Form.Field>
      {errorMsgRenderer('email')}
      <Form.Group widths="equal">
        <Form.Field>
          <label>Birthday</label>
          <Input
            placeholder="Birth day"
            type="date"
            name="birthDay"
            value={values.birthDay}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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
      </Form.Group>
      <Form.Field>
        <Button primary type="submit" floated="right">
          Submit
        </Button>
        {onCancel && (
          <Button type="button" floated="right" onClick={() => onCancel?.()}>
            Cancel
          </Button>
        )}
      </Form.Field>
    </Form>
  );
};

const validationSchema = yup.object().shape({
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
