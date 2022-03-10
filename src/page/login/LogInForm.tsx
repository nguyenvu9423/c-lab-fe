import * as React from 'react';

import { Button, Form, Input } from 'semantic-ui-react';
import { FormikHelpers, useFormik } from 'formik';
import { AuthenticationService } from '../../service/AuthenticationService';
import { FormErrorMessage, useErrorMessageRenderer } from '../../components';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions';
import { ValidationException } from '../../exception';
import { Link } from 'react-router-dom';

export namespace LoginForm {
  export interface Props {
    onSuccess?(): void;
  }

  export interface Value {
    username: string;
    password: string;
  }
}

export const LoginForm: React.FC<LoginForm.Props> = (props) => {
  const { onSuccess } = props;
  const dispatch = useDispatch();
  const [overallError, setOverallError] = React.useState<string | undefined>();

  const onSubmit = React.useCallback(
    (auth: LoginForm.Value, helpers: FormikHelpers<LoginForm.Value>) => {
      setOverallError(undefined);
      return AuthenticationService.login(auth)
        .then((response) => {
          const token = response.data;
          dispatch(login(token));
          onSuccess?.();
        })
        .catch((e) => {
          if (ValidationException.isInstance(e)) {
            helpers.setErrors(ValidationException.convertToFormikErrors(e));
          }

          if (e.error === 'invalid_grant') {
            setOverallError('Tên đăng nhập hoặc mật khẩu không chính xác');
          }
        });
    },
    [dispatch, onSuccess]
  );

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = useFormik<LoginForm.Value>({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit,
  });

  const errorMessageRenderer = useErrorMessageRenderer({ touched, errors });

  return (
    <Form
      className="clear-fix-container"
      onSubmit={handleSubmit}
      error={true}
      loading={isSubmitting}
    >
      <Form.Field>
        {overallError && <FormErrorMessage content={overallError} />}
      </Form.Field>
      <Form.Field>
        <label>Tên đăng nhập</label>
        <Input
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessageRenderer('username')}
      </Form.Field>
      <Form.Field>
        <label>Mật khẩu</label>
        <Input
          placeholder="Mật khẩu"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessageRenderer('password')}
      </Form.Field>

      <Form.Field>
        <Link to="/reset-password/request">Quên mật khẩu?</Link>
        <Button floated="right" primary content="Đăng nhập" />
      </Form.Field>
    </Form>
  );
};
