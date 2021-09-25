import * as React from 'react';
import * as yup from 'yup';
import { Button, Form, Input, Divider, Checkbox } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { Role, RoleSelect } from '../../role';

export namespace UserForm {
  export interface Props {
    initialValues: Partial<Value> & Pick<Value, 'role'>;
    onSubmit?(value: Value): void;
    onCancel?(): void;
  }

  export interface Value {
    firstName: string;
    lastName: string;
    email: string;
    birthDay?: string;
    workplace?: string;
    banned: boolean;
    emailVerified: boolean;
    role: { id: number };
  }
}

export const UserForm: React.FC<UserForm.Props> = (props) => {
  const { initialValues, onSubmit, onCancel } = props;
  const {
    values,
    setFieldValue,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik<UserForm.Value>({
    initialValues: {
      firstName: initialValues.firstName ?? '',
      lastName: initialValues.lastName ?? '',
      email: initialValues.email ?? '',
      birthDay: initialValues.birthDay,
      workplace: initialValues.workplace,
      emailVerified: initialValues.emailVerified ?? false,
      banned: initialValues.banned ?? false,
      role: initialValues.role,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit?.(values);
    },
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
        </Form.Field>
      </Form.Group>
      <Form.Group>
        <Form.Field width="8">
          <label>Email*</label>
          <Input
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Field>
          <label>Email verification</label>
          <Checkbox
            style={{ marginRight: 8 }}
            label="Email verified"
            checked={values.emailVerified}
            onChange={(event, data) =>
              setFieldValue('emailVerified', data.checked)
            }
          />
          <Button content="Resend verification" icon="send" basic />
        </Form.Field>
      </Form.Group>

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
      <Divider section />
      <Form.Group>
        <Form.Field width={8}>
          <label>Role</label>
          <RoleSelect
            value={values.role}
            onChange={(role) => setFieldValue('role', role)}
          />
        </Form.Field>
        <Form.Field width={8}>
          <label>Is banned</label>
          <Checkbox
            label="Banned"
            name="banned"
            checked={values.banned}
            onChange={(event, data) => setFieldValue('banned', data.checked)}
          />
        </Form.Field>
      </Form.Group>

      <Button primary type="submit" floated="right">
        Submit
      </Button>
      {onCancel && (
        <Button
          type="button"
          floated="right"
          content="Cancel"
          onClick={() => onCancel()}
        />
      )}
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
