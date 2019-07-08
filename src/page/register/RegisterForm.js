import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Message,
  Segment,
  Select
} from 'semantic-ui-react';
import * as React from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import UserService from '../../service/UserService';
import { connectProps, FormErrorMessage } from '../common/FormErrorMessage';

class BaseRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  isValid() {
    return this.props.isValid && this.props.status.isValid;
  }

  ErrorMessage = connectProps(this, FormErrorMessage);

  handleChange(e) {
    const { setStatus, status, handleChange } = this.props;
    const fieldName = e.target.name;
    setStatus({
      ...status,
      errors: {
        ...status.errors,
        [fieldName]: ''
      }
    });
    handleChange(e);
  }

  render() {
    const { values, handleBlur, handleSubmit, isSubmitting } = this.props;
    const handleChange = this.handleChange;
    return (
      <Grid container>
        <Grid.Row centered columns={1}>
          <Grid.Column style={{ maxWidth: 560 }}>
            <Header as={'h3'} attached={'top'} block>
              Register
            </Header>
            <Segment attached>
              <Form
                onSubmit={handleSubmit}
                error={!this.isValid()}
                loading={isSubmitting}
              >
                <Form.Field>
                  <label>Username*</label>
                  <Input
                    placeholder={'Username'}
                    name={'username'}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <this.ErrorMessage name={'username'} />
                </Form.Field>
                <Form.Field>
                  <label>Password*</label>
                  <Input
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <this.ErrorMessage name={'password'} />
                </Form.Field>
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
                    <this.ErrorMessage name={'firstName'} />
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
                    <this.ErrorMessage name={'lastName'} />
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
                <this.ErrorMessage name={'email'} />
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
                <Button primary type={'submit'}>
                  Submit
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const RegisterForm = withFormik({
  mapPropsToValues: () => {
    return {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDay: '',
      workplace: ''
    };
  },
  mapPropsToStatus: () => {
    return {
      isValid: true,
      errors: {}
    };
  },
  handleSubmit: (values, bag) => {
    UserService.register(values)
      .then(value => {
        bag.setSubmitting(false);
        if (bag.props.onRegisterSuccess) bag.props.onRegisterSuccess(value);
      })
      .catch(error => {
        const errors = {};
        const errorList = error.response.data;
        errorList.forEach(item => {
          errors[item.field] = item.defaultMessage;
        });
        bag.setSubmitting(false);
        bag.setStatus({
          isValid: false,
          errors
        });
      });
  },
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(8, 'Username should be at least 8 characters')
      .max(24, 'Username should be at most 24 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be at least 8 characters')
      .max(24, 'Password should be at most 24 characters'),
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
    email: yup
      .string()
      .required('Email is required')
      .email('Email is not valid')
  })
})(BaseRegisterForm);

export { RegisterForm };
