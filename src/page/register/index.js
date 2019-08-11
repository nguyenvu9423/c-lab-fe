import * as React from 'react';
import { withRouter } from 'react-router';
import { RegisterForm } from './RegisterForm';

class BaseRegisterPage extends React.Component {
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

export const RegisterPage = withRouter(BaseRegisterPage);
