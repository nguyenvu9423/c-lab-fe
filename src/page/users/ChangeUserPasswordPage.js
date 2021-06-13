import React from 'react';
import { withFormik } from 'formik';
import { Button, Form, Grid, Header, Input, Segment } from 'semantic-ui-react';
import * as yup from 'yup';
import { FormErrorMessage } from '../common/FormErrorMessage';
import { UserService } from '../../service/UserService';

class BaseChangeUserPasswordForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  isValid() {
    return this.props.isValid && this.props.status.isValid;
  }

  ErrorMessage = FormErrorMessage.connectProps(this, FormErrorMessage);
  handleChange(e) {
    const { setStatus, status, handleChange } = this.props;
    const fieldName = e.target.name;
    setStatus({
      ...status,
      errors: {
        ...status.errors,
        [fieldName]: '',
      },
    });
    handleChange(e);
  }

  render() {
    const { values, handleChange, handleSubmit, handleBlur, isSubmitting } =
      this.props;
    return (
      <Grid container>
        <Grid.Row centered columns={1}>
          <Grid.Column style={{ maxWidth: 560 }}>
            <Header as={'h3'} attached="top" block>
              Change password
            </Header>
            <Segment attached>
              <Form
                onSubmit={handleSubmit}
                error={!this.isValid()}
                loading={isSubmitting}
              >
                <Form.Field>
                  <label>New password</label>
                  <Input
                    name={'newPassword'}
                    type="password"
                    value={values.newPassword}
                    onChange={this.handleChange}
                    onBlur={handleBlur}
                  />
                  <this.ErrorMessage name={'newPassword'} />
                </Form.Field>
                <Form.Field>
                  <label>Confirm new password</label>
                  <Input
                    name={'confirmNewPassword'}
                    type="password"
                    value={values.confirmNewPassword}
                    onChange={this.handleChange}
                    onBlur={handleBlur}
                  />
                  <this.ErrorMessage name={'confirmNewPassword'} />
                </Form.Field>
                <Form.Field>
                  <label>Old password</label>
                  <Input
                    name={'oldPassword'}
                    type="password"
                    value={values.oldPassword}
                    onChange={this.handleChange}
                    onBlur={handleBlur}
                  />
                  <this.ErrorMessage name={'oldPassword'} />
                </Form.Field>
                <div className="clear-fix-container">
                  <Button primary type={'submit'} floated="right">
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

const ChangeUserPasswordForm = withFormik({
  mapPropsToValues: (props) => {
    return { newPassword: '', confirmNewPassword: '', oldPassword: '' };
  },
  mapPropsToStatus: () => {
    return {
      isValid: true,
      errors: {},
    };
  },
  handleSubmit: (values, bag) => {
    const changePasswordDTO = {
      newPassword: values.newPassword,
      oldPassword: values.oldPassword,
    };
    const { onSubmit } = bag.props;
    onSubmit(changePasswordDTO, bag);
  },
  validationSchema: yup.object().shape({
    newPassword: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be at least 8 characters')
      .max(24, 'Password should be at most 24 characters'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Confirm password must match')
      .required('Password is required'),
    oldPassword: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be at least 8 characters')
      .max(24, 'Password should be at most 24 characters'),
  }),
})(BaseChangeUserPasswordForm);

class ChangeUserPasswordPage extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, bag) {
    const {
      match: { params },
      history,
    } = this.props;

    UserService.updateUserPassword(params.username, values)
      .then((response) => {
        const { data: user } = response;
        history.goBack();
        bag.setSubmitting(false);
      })
      .catch((error) => {
        const errors = {};
        const errorList = error.response.data;
        errorList.forEach((item) => {
          errors[item.field] = item.defaultMessage;
        });
        bag.setStatus({
          isValid: false,
          errors,
        });
        bag.setSubmitting(false);
      });
  }

  render() {
    return <ChangeUserPasswordForm onSubmit={this.handleSubmit} />;
  }
}

export { ChangeUserPasswordPage };
