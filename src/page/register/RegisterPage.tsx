import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Redirect, useHistory } from 'react-router-dom';

import { RegisterForm } from '../../domains/user/forms/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { addToast } from '../../store/actions';
import { AuthenticationSelectors } from '../../store/selectors';

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector(AuthenticationSelectors.isAuthenticated());

  const handleSuccess = React.useCallback(() => {
    history.push('/login');
    dispatch(
      addToast({
        header: 'Đăng kí thành công',
        content: 'Tài khoản của bạn đã được lập',
        duration: 2500,
        status: 'positive',
      })
    );
  }, [history]);

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container>
      <Grid.Row centered columns={1}>
        <Grid.Column style={{ maxWidth: 560 }}>
          <Header as="h3" attached="top" block>
            Đăng kí
          </Header>
          <Segment attached>
            <RegisterForm onSuccess={handleSuccess} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
