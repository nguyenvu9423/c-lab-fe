import * as React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class TopNav extends React.Component {
  render() {
    return (
      <Menu inverted fixed={'top'}>
        <Container>
          <Menu.Item header>Log N</Menu.Item>
          <Menu.Item name={'articles'} />
          <Menu.Menu position={'right'}>
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
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default TopNav;
