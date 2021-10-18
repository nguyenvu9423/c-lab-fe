import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import { PermissionSelect } from './PermissionSelect';
import { useErrorMessageRenderer } from '../../components';
import { PermissionDTO } from '.';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^ROLE_[A-Z0-9_]*$/,
      'Tên chỉ có thể chứa các chữ cái in hoa, số, dấu gạch dưới và phải bắt đầu với "ROLE_"'
    ),
  permissions: yup.array().min(1, 'Vai trò cần ít nhất 1 quyền hạn'),
});

export namespace RoleForm {
  export interface Props {
    initialValue: Partial<Value>;
    onSubmit?(value: Value): void;
    onCancel?(): void;
  }

  export interface Value {
    name: string;
    permissions: PermissionDTO[];
  }
}

export const RoleForm: React.FC<RoleForm.Props> = (props) => {
  const { initialValue, onSubmit, onCancel } = props;

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
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: initialValue?.name ?? '',
      permissions: initialValue?.permissions ?? [],
    },
    onSubmit: onSubmitHandler,
    validationSchema: validationSchema,
  });

  const errorMsgRenderer = useErrorMessageRenderer({ touched, errors });

  return (
    <Form error={true} onSubmit={handleSubmit} loading={isSubmitting}>
      <Form.Field width={8}>
        <label>Tên</label>
        <Form.Input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMsgRenderer('name')}
      </Form.Field>

      <Form.Field width={16}>
        <label>Quyền</label>
        <PermissionSelect
          value={values.permissions}
          onChange={(pers) => setFieldValue('permissions', pers)}
          onBlur={() => setFieldTouched('permissions')}
        />
        {errorMsgRenderer('permissions')}
      </Form.Field>
      <div className="clear-fix-container">
        {onSubmit && (
          <Button primary type="submit" floated="right">
            Lưu
          </Button>
        )}
        {onCancel && (
          <Button
            type="button"
            floated="right"
            content="Hủy"
            onClick={onCancel}
          />
        )}
      </div>
    </Form>
  );
};
