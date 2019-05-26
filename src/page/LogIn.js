import * as React from 'react';
import { withRouter } from 'react-router';
import { LoginForm } from '../component/form/LogInForm';
import { fetchLoginUser } from '../action/user';
import { connect } from 'react-redux';

class BaseLogIn extends React.Component {
  constructor() {
    super();
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
  }

  handleLoginSuccess() {
    const { history, loadLoginUser } = this.props;
    loadLoginUser();
    history.push('/');
  }

  render() {
    return <LoginForm onLoginSuccess={this.handleLoginSuccess} />;
  }
}

export const LoginPage = connect(
  null,
  { loadLoginUser: fetchLoginUser.request }
)(withRouter(BaseLogIn));
