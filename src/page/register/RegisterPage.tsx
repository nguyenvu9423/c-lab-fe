import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

import { RegisterForm } from '../../domains/user/forms/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { addToast } from '../../store/actions';
import { AuthenticationSelectors } from '../../store/selectors';
import { useScrollToTop } from '../../common/hooks';
import { Navigate, useNavigate } from 'react-router';

export const RegisterPage: React.FC = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(AuthenticationSelectors.isAuthenticated());

  const handleSuccess = React.useCallback(() => {
    navigate('/login');
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
    return <Navigate to="/" />;
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
