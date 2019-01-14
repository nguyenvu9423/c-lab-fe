import * as React from "react";
import { Button, Container, Menu } from 'semantic-ui-react';

class TopNav extends React.Component {
  render() {
    return (
      <Menu inverted fixed={'top'}>
        <Container>
          <Menu.Item header>Log N</Menu.Item>
          <Menu.Item name={'articles'} />
          <Menu.Menu position={'right'}>
            <Menu.Item>
              <Button primary>Sign up</Button>
            </Menu.Item>
            <Menu.Item>
              <Button>Log in</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default TopNav;
