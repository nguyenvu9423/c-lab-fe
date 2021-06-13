import * as React from 'react';
import * as yup from 'yup';
import { Button, Form, Input, Divider } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { UserStatus, userStatusValues } from './UserStatus';

export function UserForm(props) {
  const { isSubmitting, initialValues, onSubmit, onCancel } = props;
  const { values, setFieldValue, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues: initialValues
        ? {
            status: initialValues.status || undefined,
            firstName: initialValues.firstName || '',
            lastName: initialValues.lastName || '',
            email: initialValues.email || '',
            birthDay: initialValues.birthDay || undefined,
            workplace: initialValues.workplace || undefined,
          }
        : {
            status: undefined,
            firstName: '',
            lastName: '',
            email: '',
            birthDay: undefined,
            workplace: undefined,
          },
      validationSchema,
      onSubmit: (values) => {
        onSubmit?.(values);
      },
    });

  return (
    <Form onSubmit={handleSubmit} error={true} loading={isSubmitting}>
      <Form.Field width={4}>
        <label>Status</label>
        <Form.Select
          name="status"
          options={statusOptions}
          value={values.status}
          onChange={(event, data) => setFieldValue('status', data.value)}
        />
      </Form.Field>

      <Divider section />

      <Form.Group widths={'equal'}>
        <Form.Field>
          <label>First name*</label>
          <Input
            placeholder={'First name'}
            name={'firstName'}
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Field>
          <label>Last name*</label>
          <Input
            placeholder={'Last name'}
            name={'lastName'}
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Email*</label>
        <Input
          placeholder={'Email'}
          name={'email'}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Field>
      <Form.Group widths={'equal'}>
        <Form.Field>
          <label>Birthday</label>
          <Input
            placeholder={'Birth day'}
            type={'date'}
            name={'birthDay'}
            value={values.birthDay}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Field>
          <label>Workplace</label>
          <Input
            placeholder={'Workplace'}
            name={'workplace'}
            value={values.workplace}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
      </Form.Group>
      <Button primary type="submit" floated="right">
        Submit
      </Button>
      <Button
        type="button"
        floated="right"
        content="Cancel"
        onClick={() => onCancel?.()}
      />
    </Form>
  );
}

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

const statusOptions = userStatusValues.map((item) => ({
  value: item.name,
  text: item.title,
}));
