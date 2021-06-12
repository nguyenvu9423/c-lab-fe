import * as React from 'react';

import { Button, Checkbox, Form, Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { AuthenticationService } from '../../service/AuthenticationService';
import { useErrorMessageRenderer } from '../../components';
import { validationSchema } from './validation-schema';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions';

export function LoginForm(props) {
  const { onSuccess } = props;
  const dispatch = useDispatch();

  const onSubmit = React.useCallback(
    auth => {
      AuthenticationService.login(auth).then(response => {
        const token = response.data;
        dispatch(login(token));
        onSuccess?.();
      });
    },
    [onSuccess]
  );

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting
  } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit
  });

  const errorMessageRenderer = useErrorMessageRenderer({ touched, errors });

  return (
    <Form onSubmit={handleSubmit} error={true} loading={isSubmitting}>
      <Form.Field>
        <label>Username</label>
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
        <label>Password</label>
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessageRenderer('password')}
      </Form.Field>
      {errorMessageRenderer('overall')}
      <div className="clear-fix-container">
        <Checkbox label="Remember me" />
        <Button primary type="submit" floated="right">
          Submit
        </Button>
      </div>
    </Form>
  );
}
