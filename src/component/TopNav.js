import * as React from 'react';
import { Button, Container, Dropdown, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fragment } from 'react';

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
          <Button icon>
            <Icon name={'edit'} />
            Write
          </Button>
        </Menu.Item>
        <Dropdown item text={user.lastName}>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={'users/me'}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item>Upload problem</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  }
}

class TopNav extends React.Component {
  render() {
    const { login } = this.props;
    return (
      <Menu fixed={'top'} size={'large'}>
        <Container>
          <Menu.Item header>Log N</Menu.Item>
          <Menu.Item name={'articles'} />
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

export default connect(state => {
  return { login: state.login };
})(TopNav);
