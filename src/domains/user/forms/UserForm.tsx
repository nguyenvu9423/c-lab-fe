import * as React from 'react';
import * as yup from 'yup';
import { Button, Form, Input, Divider, Checkbox } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { RoleSelect } from '../../role';
import { UserFieldSchemas } from './UserFormSchemas';

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
          <label>Tên*</label>
          <Input
            placeholder="Tên"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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
          <label>Xác nhận Email</label>
          <Checkbox
            style={{ marginRight: 8 }}
            label="Đã xác nhận email"
            checked={values.emailVerified}
            onChange={(event, data) =>
              setFieldValue('emailVerified', data.checked)
            }
          />
          <Button
            type="button"
            content="Gửi lại email xác nhận"
            icon="send"
            basic
          />
        </Form.Field>
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Field>
          <label>Ngày sinh</label>
          <Input
            placeholder="01/01/1970"
            type="date"
            name="birthDay"
            value={values.birthDay}
            onChange={handleChange}
            onBlur={handleBlur}
          />
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
      </Form.Group>
      <Divider section />
      <Form.Group>
        <Form.Field width={8}>
          <label>Vai trò</label>
          <RoleSelect
            value={values.role}
            onChange={(role) => setFieldValue('role', role)}
          />
        </Form.Field>
        <Form.Field width={8}>
          <label>Bị cấm</label>
          <Checkbox
            label="Bị cấm"
            name="banned"
            checked={values.banned}
            onChange={(event, data) => setFieldValue('banned', data.checked)}
          />
        </Form.Field>
      </Form.Group>

      <Button primary type="submit" floated="right">
        Lưu
      </Button>
      {onCancel && (
        <Button
          type="button"
          floated="right"
          content="Hủy"
          onClick={() => onCancel()}
        />
      )}
    </Form>
  );
};

const validationSchema = yup.object().shape({
  firstName: UserFieldSchemas.firstName,
  lastName: UserFieldSchemas.lastName,
  email: UserFieldSchemas.email,
  workplace: UserFieldSchemas.workplace,
});
