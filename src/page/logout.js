import React from 'react';
import { withRouter } from 'react-router';
import { AuthProvider } from '../authentication/tokenProvider';
import { logUserOut } from '../action/user';
import { connect } from 'react-redux';

class BaseLogoutPage extends React.Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { history, logUserOut } = this.props;
    AuthProvider.clearToken();
    logUserOut();
    history.goBack();
  }

  render() {
    return null;
  }
}

export let LogoutPage = connect(
  undefined,
  { logUserOut: logUserOut }
)(withRouter(BaseLogoutPage));
