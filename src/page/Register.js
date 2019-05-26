import * as React from 'react';
import { RegisterForm } from '../component/form/RegisterForm';
import { withRouter } from 'react-router';

class BaseRegister extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegisterSuccess = this.handleRegisterSuccess.bind(this);
  }

  handleRegisterSuccess() {
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    return <RegisterForm onRegisterSuccess={this.handleRegisterSuccess} />;
  }
}

export const RegisterPage = withRouter(BaseRegister);
