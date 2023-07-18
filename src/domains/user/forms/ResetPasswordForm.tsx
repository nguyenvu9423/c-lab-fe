import * as React from 'react';
import * as yup from 'yup';

import { useFormik } from 'formik';
import { Form } from 'semantic-ui-react';
import {
  ErrorMessage,
  LoadingIndicator,
  useErrorMessageRenderer,
} from '../../../components';
import { ResetPasswordService } from '../../../services/ResetPasswordService';
import { SubmitButton } from '../../../components/button';
import { UserFieldSchemas } from './UserFormSchemas';

export namespace ResetPasswordForm {
  export interface Props {
    id: string;
    token: string;
    onSuccess?(): void;
  }

  export type RequestValidity =
    | { valid: true }
    | { valid: false; message: string };
}

export const ResetPasswordForm: React.FC<ResetPasswordForm.Props> = (props) => {
  const { id, token, onSuccess } = props;
  const [requestValidity, setRequestValidity] = React.useState<
    ResetPasswordForm.RequestValidity | undefined
  >();

  React.useEffect(() => {
    ResetPasswordService.isExist(id, token).then(({ data }) => {
      if (data) {
        setRequestValidity({ valid: true });
      } else {
        setRequestValidity({ valid: false, message: 'Request is not valid' });
      }
    });
  }, [id, token]);

  const handleSubmit = React.useCallback(
    (values: BaseRequestPasswordForm.Value) => {
      return ResetPasswordService.resetPassword(
        id,
        token,
        values.newPassword
      ).then(() => {
        onSuccess?.();
      });
    },
    [id, token, onSuccess]
  );

  if (requestValidity === undefined) {
    return <LoadingIndicator />;
  }

  return requestValidity.valid ? (
    <BaseRequestPasswordForm onSubmit={handleSubmit} />
  ) : (
    <ErrorMessage message={requestValidity.message} />
  );
};

namespace BaseRequestPasswordForm {
  export interface Props {
    onSubmit?(value: Value): Promise<any>;
  }

  export interface Value {
    newPassword: string;
    confirmNewPassword: string;
  }
}

const BaseRequestPasswordForm: React.FC<BaseRequestPasswordForm.Props> = (
  props
) => {
  const { onSubmit } = props;

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<BaseRequestPasswordForm.Value>({
    initialValues: { newPassword: '', confirmNewPassword: '' },
    validationSchema,
    onSubmit: (value) => onSubmit?.(value),
  });

  const errorMsgRenderer = useErrorMessageRenderer({ touched, errors });

  return (
    <Form
      className="clear-fix-container"
      error
      loading={isSubmitting}
      onSubmit={handleSubmit}
    >
      <Form.Field>
        <label>Mật khẩu mới</label>
        <Form.Input
          type="password"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMsgRenderer('newPassword')}
      </Form.Field>
      <Form.Field>
        <label>Xác nhận mật khẩu mới</label>
        <Form.Input
          type="password"
          name="confirmNewPassword"
          value={values.confirmNewPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMsgRenderer('confirmNewPassword')}
      </Form.Field>
      <Form.Field>
        <SubmitButton floated="right" />
      </Form.Field>
    </Form>
  );
};

const validationSchema = yup.object({
  newPassword: UserFieldSchemas.password,
  confirmNewPassword: yup
    .string()
    .equals([yup.ref('newPassword')], 'Mật khẩu xác nhận không trùng khớp'),
});
