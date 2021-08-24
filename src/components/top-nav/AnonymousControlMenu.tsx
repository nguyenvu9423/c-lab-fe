import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import { LoginButton } from '../../page/common';

export const AnonymousControlMenu: React.FC = () => {
  return (
    <>
      <Menu.Item>
        <Button primary as={Link} to={'/register'}>
          Đăng kí
        </Button>
      </Menu.Item>
      <Menu.Item>
        <LoginButton />
      </Menu.Item>
    </>
  );
};
