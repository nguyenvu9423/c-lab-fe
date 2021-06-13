import * as React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

export function LoginButton(props) {
  const history = useHistory();
  return (
    <Button
      as={Link}
      to={{
        pathname: '/login',
        state: { prevPath: history.location.pathname },
      }}
      {...props}
    >
      Đăng Nhập
    </Button>
  );
}
