import * as React from 'react';
import { useFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import { PermissionSelect } from './PermissionSelect';
import { validationSchema } from './validation-schema';
import { useErrorMessageRenderer } from '../../components';

export function RoleForm(props) {
  const { initialRole, onSubmit, onCancel, isSubmitting } = props;

  const onSubmitHandler = React.useCallback((values) => {
    onSubmit?.(values);
  }, []);

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      name: initialRole?.name ?? '',
      permissions: initialRole?.permissions ?? [],
    },
    onSubmit: onSubmitHandler,
    validationSchema: validationSchema,
  });

  const errorMsgRenderer = useErrorMessageRenderer({ touched, errors });

  return (
    <Form error={true} onSubmit={handleSubmit} loading={isSubmitting}>
      <Form.Field width={8}>
        <label>Name</label>
        <Form.Input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMsgRenderer('name')}
      </Form.Field>

      <Form.Field width={16}>
        <label>Permissions</label>
        <PermissionSelect
          value={values.permissions}
          onChange={(pers) => setFieldValue('permissions', pers)}
          onBlur={() => setFieldTouched('permissions')}
        />
        {errorMsgRenderer('permissions')}
      </Form.Field>
      <div className="clear-fix-container">
        <Button primary type="submit" floated="right">
          Submit
        </Button>
        <Button
          type="button"
          floated="right"
          content="Cancel"
          onClick={() => onCancel?.()}
        />
      </div>
    </Form>
  );
}
