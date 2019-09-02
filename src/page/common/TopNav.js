import * as React from 'react';
import { Button, Container, Dropdown, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import { fetchLoginUser } from '../../action/user';
import { withRouter } from 'react-router';

class NotLoginUserControlMenu extends React.Component {
  render() {
    return (
      <Fragment>
        <Menu.Item>
          <Button primary as={Link} to={'/register'}>
            Sign up
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to={'/login'}>
            Log in
          </Button>
        </Menu.Item>
      </Fragment>
    );
  }
}

class UserControlMenu extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <Menu.Item>
          <Button
            icon={'edit'}
            as={Link}
            to={'/articles/add'}
            label={'Write'}
          />
        </Menu.Item>
        <Dropdown item text={user.lastName}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={`/users/${user.username}`}
              icon={'user'}
              text={'Profile'}
            />
            <Dropdown.Item icon={'book'} text={'Upload problem'} />
            <Dropdown.Divider />
            <Dropdown.Item
              icon={'sign-out'}
              text={'Log out'}
              as={Link}
              to={'/logout'}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  }
}

class TopNav extends React.Component {
  componentDidMount() {
    const { fetchLoginUser } = this.props;
    fetchLoginUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const { fetchLoginUser } = this.props;
      fetchLoginUser();
    }
  }

  render() {
    const { login } = this.props;
    return (
      <Menu fixed={'top'} size={'large'}>
        <Container>
          <Menu.Item header as={Link} to={'/'}>
            Log N
          </Menu.Item>
          <Menu.Item name={'articles'} as={Link} to={'/articles'} />
          <Menu.Menu position={'right'}>
            {login.isLogin ? (
              <UserControlMenu user={login.loginUser} />
            ) : (
              <NotLoginUserControlMenu />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default connect(
  state => {
    const { login, entities } = state;
    const { loginUser } = state.login;
    return { login: { ...login, loginUser: entities.user[loginUser] } };
  },
  { fetchLoginUser: fetchLoginUser.request }
)(withRouter(TopNav));
