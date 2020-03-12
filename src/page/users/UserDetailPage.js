import * as React from 'react';
import { UserProfilePanel } from './components/UserProfilePanel';
import { UserSettingMenu } from './components/UserSettingMenu';
import connect from 'react-redux/es/connect/connect';
import { fetchUserByUsername } from '../../store/actions/user';
import { Grid } from 'semantic-ui-react';

class BaseUserDetailPage extends React.Component {
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
    return (
      <Grid container doubling columns={2}>
        <Grid.Column width={12}>
          <UserProfilePanel user={user} />
        </Grid.Column>
        <Grid.Column width={4}>
          <UserSettingMenu user={user} />
        </Grid.Column>
      </Grid>
    );
  }
}

export const UserDetailPage = connect(
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
)(BaseUserDetailPage);
