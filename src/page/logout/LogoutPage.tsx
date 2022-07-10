import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import { useScrollToTop } from '../../common/hooks';
import { addToast, logout } from '../../store/actions';
import { AuthenticationSelectors } from '../../store/selectors';
import { LoginForm } from '../login';

export const LogoutPage: React.FC = () => {
  useScrollToTop();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFirstRender = React.useRef(true);

  const isAuthenticated = useSelector(
    AuthenticationSelectors.isAuthenticated()
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(logout());
      dispatch(
        addToast({
          header: 'Đăng xuất',
          content: 'Bạn đã đang xuất thành công',
          duration: 2500,
          status: 'positive',
        })
      );
    }
  }, []);

  React.useEffect(() => {
    isFirstRender.current = false;
  }, []);

  if (isFirstRender.current && !isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isAuthenticated) {
    return <Loader active content="Logging out" />;
  }

  return (
    <>
      <Helmet>
        <title>Đăng xuất</title>
      </Helmet>
      <Grid container>
        <Grid.Row centered column={1}>
          <Grid.Column style={{ maxWidth: 480 }}>
            <Header as="h4" attached="top" block>
              Đăng nhập
            </Header>
            <Segment attached>
              <LoginForm
                onSuccess={() => {
                  navigate('/');
                }}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
