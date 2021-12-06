import * as React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

export const LoginButton: React.FC<ButtonProps> = (props) => {
  const location = useLocation();

  const prevPath = location.pathname;
  return (
    <Button
      as={Link}
      to={{
        pathname: '/login',
        state: { prevPath: shouldGoBack(prevPath) ? prevPath : undefined },
      }}
      icon="sign in"
      {...props}
    >
      Đăng Nhập
    </Button>
  );
};

function shouldGoBack(url: string) {
  return (
    !url.startsWith('/logout') &&
    !url.startsWith('/login') &&
    !url.startsWith('reset-password')
  );
}
