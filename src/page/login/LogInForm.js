import * as React from 'react';
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Input,
  Segment
} from 'semantic-ui-react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { AuthProvider } from '../../authentication/tokenProvider';
import { FormErrorMessage } from '../common/FormErrorMessage';
import { AuthService } from '../../service/AuthService';

class BaseLogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.isValid = this.isValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  isValid() {
    return this.props.isValid && this.props.status.isValid;
  }

  ErrorMessage = FormErrorMessage.connectProps(this, FormErrorMessage);

  handleChange(event) {
    const { setStatus, handleChange } = this.props;
    setStatus({
      isValid: false,
      errors: {}
    });
    handleChange(event);
  }

  render() {
    const { isSubmitting, values, handleSubmit, handleBlur } = this.props;
    return (
      <Grid container>
        <Grid.Row centered column={1}>
          <Grid.Column style={{ maxWidth: 480 }}>
            <Header as={'h4'} attached={'top'} block>
              Login
            </Header>
            <Segment attached>
              <Form
                onSubmit={handleSubmit}
                error={!this.isValid()}
                loading={isSubmitting}
              >
                <Form.Field>
                  <label>Username</label>
                  <Input
                    placeholder={'Username'}
                    name={'username'}
                    value={values.username}
                    onChange={this.handleChange}
                    onBlur={handleBlur}
                  />
                  <this.ErrorMessage name={'username'} />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <Input
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    value={values.password}
                    onChange={this.handleChange}
                    onBlur={handleBlur}
                  />
                  <this.ErrorMessage name={'password'} />
                </Form.Field>
                <this.ErrorMessage name={'overall'} />
                <div className={'clear-fix-container'}>
                  <Checkbox label={'Remember me'} />
                  <Button primary type={'submit'} floated={'right'}>
                    Submit
                  </Button>
                </div>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const LoginForm = withFormik({
  mapPropsToValues: () => {
    return {
      username: '',
      password: ''
    };
  },
  mapPropsToStatus: props => {
    return { isValid: false, errors: {} };
  },
  handleSubmit: (values, bag) => {
    const { props } = bag;
    AuthService.getToken(values)
      .then(response => {
        const { data } = response;
        AuthProvider.setToken(data);
        bag.setSubmitting(false);
        props.onLoginSuccess();
      })
      .catch(error => {
        const {
          response: { data, status }
        } = error;
        if (status === 400 && data.error === 'invalid_grant') {
          bag.setFieldTouched('overall', true);
          bag.setStatus({
            isValid: false,
            errors: {
              overall: 'Incorrect username or password'
            }
          });
        }
        bag.setSubmitting(false);
      });
  },
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(8, 'Invalid username')
      .max(24, 'Invalid username'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Invalid password')
      .max(24, 'Invalid password')
  })
})(BaseLogInForm);

export { LoginForm };
