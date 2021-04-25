import * as React from 'react';

import { Button, Checkbox, Form, Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { AuthenticationService } from '../../service/AuthenticationService';
import { useErrorMessageRenderer } from '../../components';
import { validationSchema } from './validation-schema';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/actions/token';

export function LoginForm(props) {
  const { onSuccess } = props;
  const dispatch = useDispatch();

  const onSubmit = React.useCallback(
    auth => {
      AuthenticationService.login(auth).then(response => {
        console.log(response);
        const token = response.data;
        dispatch(setToken(token));
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

// class BaseLogInForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.isValid = this.isValid.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   isValid() {
//     return this.props.isValid && this.props.status.isValid;
//   }

//   ErrorMessage = FormErrorMessage.connectProps(this, FormErrorMessage);

//   handleChange(event) {
//     const { setStatus, handleChange } = this.props;
//     setStatus({
//       isValid: false,
//       errors: {}
//     });
//     handleChange(event);
//   }

//   render() {
//     const { isSubmitting, values, handleSubmit, handleBlur } = this.props;
//     return (
//       <Grid container>
//         <Grid.Row centered column={1}>
//           <Grid.Column style={{ maxWidth: 480 }}>
//             <Header as={'h4'} attached={'top'} block>
//               Login
//             </Header>
//             <Segment attached></Segment>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     );
//   }
// }

// const LoginForm = withFormik({
//   mapPropsToValues: () => {
//     return {
//       username: '',
//       password: ''
//     };
//   },
//   mapPropsToStatus: props => {
//     return { isValid: false, errors: {} };
//   },
//   handleSubmit: (values, bag) => {
//     const { props } = bag;
//     AuthService.getToken(values)
//       .then(response => {
//         const { data } = response;
//         AuthProvider.setToken(data);
//         bag.setSubmitting(false);
//         props.onLoginSuccess();
//       })
//       .catch(error => {
//         const {
//           response: { data, status }
//         } = error;
//         if (status === 400 && data.error === 'invalid_grant') {
//           bag.setFieldTouched('overall', true);
//           bag.setStatus({
//             isValid: false,
//             errors: {
//               overall: 'Incorrect username or password'
//             }
//           });
//         }
//         bag.setSubmitting(false);
//       });
//   },
//   validationSchema
// })(BaseLogInForm);

// export { LoginForm };
