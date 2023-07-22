import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

import { RegisterForm } from '@/domain-ui/user';
import { addToast } from '@/store/actions';
import { AuthenticationSelectors } from '@/store/selectors';
import { useScrollToTop } from '@/shared/hooks';

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
    <>
      <Helmet>
        <title>Đăng kí</title>
      </Helmet>
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
    </>
  );
};
