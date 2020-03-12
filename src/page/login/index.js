import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { LoginForm } from './LogInForm';
import { fetchLoginUser } from '../../store/actions/user';

class BaseLogIn extends React.Component {
  constructor() {
    super();
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
  }

  handleLoginSuccess() {
    const { history, loadLoginUser } = this.props;
    loadLoginUser();
    history.goBack();
  }

  render() {
    return <LoginForm onLoginSuccess={this.handleLoginSuccess} />;
  }
}

export const LoginPage = connect(
  null,
  { loadLoginUser: fetchLoginUser.request }
)(withRouter(BaseLogIn));
