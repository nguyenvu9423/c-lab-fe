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
import { ErrorMessage, withFormik } from 'formik';
import * as yup from 'yup';
import UserService from '../../service/UserService';

class BaseLogInForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      isValid,
      isSubmitting,
      values,
      handleChange,
      handleSubmit
    } = this.props;
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
                loading={isSubmitting}
                error={!isValid}
              >
                <Form.Field>
                  <label>Username</label>
                  <Input
                    placeholder={'Username'}
                    name={'username'}
                    value={values.username}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    render={msg => <FormErrorMessage content={msg} />}
                    name={'username'}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <Input
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    value={values.password}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    render={msg => <FormErrorMessage content={msg} />}
                    name={'password'}
                  />
                </Form.Field>
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
    return { isValid: false, errors: [] };
  },
  handleSubmit: (values, bag) => {
    const { props } = bag;
    UserService.login(values)
      .then(response => {
        const { data } = response;
        localStorage.setItem('token', JSON.stringify(data));
        bag.setSubmitting(false);
        props.onLoginSuccess();
      })
      .catch(error => {
        console.log(error);
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
