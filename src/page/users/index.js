import * as React from 'react';
import { connect } from 'react-redux';
import { fetchUserByUsername } from '../../action/user';
import { UserProfilePanel } from './UserProfilePanel';

class BaseUserProfile extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { match, fetchUserByUsername } = this.props;
    const { username } = match.params;
    fetchUserByUsername(username);
    this.setState({ ...this.state, username });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const { username: newUsername } = this.props.match.params;
      this.props.fetchUserByUsername(newUsername);
    }
  }

  render() {
    const { user } = this.props;
    return <UserProfilePanel user={user} />;
  }
}

export const UserPage = connect(
  (state, ownProps) => {
    const {
      match: {
        params: { username }
      }
    } = ownProps;
    const loginUserId = state.login.loginUser;
    const userList = state.entities.user;
    const user = Object.values(userList).find(
      item => item.username === username
    );
    const loginUser = loginUserId ? null : userList[loginUserId];
    return {
      user,
      loginUser
    };
  },
  { fetchUserByUsername: fetchUserByUsername.request }
)(BaseUserProfile);
