import * as React from 'react';
import { RegisterForm } from '../component/form/RegisterForm';
import withRouter from 'react-router/es/withRouter';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegisterSuccess = this.handleRegisterSuccess.bind(this);
  }

  handleRegisterSuccess() {
    this.props.history.push('/');
  }

  render() {
    return <RegisterForm onRegisterSuccess={this.handleRegisterSuccess} />;
  }
}

export default withRouter(Register);
