import * as React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

export const LoginButton: React.FC<ButtonProps> = (props) => {
  const history = useHistory();
  const prevPath = history.location.pathname;
  return (
    <Button
      as={Link}
      to={{
        pathname: '/login',
        state: { prevPath: shouldGoBack(prevPath) ? prevPath : undefined },
      }}
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
