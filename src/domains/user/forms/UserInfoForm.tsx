import * as React from 'react';
import * as yup from 'yup';
import { Button, Form, Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useErrorMessageRenderer } from '../../../components';
import { UserFieldSchemas } from './UserFormSchemas';

export namespace UserInfoForm {
  export interface Props {
    initialValues?: Partial<Value>;
    onSubmit?(value: Value): Promise<unknown> | void;
    onCancel?(): void;
  }
  export interface Value {
    firstName: string;
    lastName: string;
    birthday?: string;
    workplace?: string;
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
      birthday: initialValues?.birthday ?? undefined,
      workplace: initialValues?.workplace ?? undefined,
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
          <label>Tên*</label>
          <Input
            placeholder="Tên"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMsgRenderer('firstName')}
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
          {errorMsgRenderer('lastName')}
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Birthday</label>
          <Input
            placeholder="NGày sinh"
            type="date"
            name="birthday"
            value={values.birthday}
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
          {errorMsgRenderer('workplace')}
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <Button primary type="submit" floated="right">
          Lưu
        </Button>
        {onCancel && (
          <Button type="button" floated="right" onClick={() => onCancel?.()}>
            Hủy
          </Button>
        )}
      </Form.Field>
    </Form>
  );
};

const validationSchema = yup.object().shape({
  firstName: UserFieldSchemas.firstName,
  lastName: UserFieldSchemas.lastName,
  workplace: UserFieldSchemas.workplace,
});
