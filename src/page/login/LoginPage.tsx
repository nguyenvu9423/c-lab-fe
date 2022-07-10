import * as React from 'react';
import Lodash from 'lodash';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

import { Grid, Header, Segment } from 'semantic-ui-react';
import { LoginForm } from './LogInForm';
import { AuthenticationSelectors } from '../../store/selectors';
import { useScrollToTop } from '../../common/hooks';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';

export const LoginPage: React.FC = () => {
  useScrollToTop();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSuccess = React.useCallback(() => {
    const prevPath: string | undefined = Lodash.get(location.state, 'prevPath');

    if (prevPath) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [navigate, location]);

  const authenticated = useSelector(AuthenticationSelectors.isAuthenticated());

  React.useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
  }, [navigate, authenticated]);

  if (authenticated || authenticated === undefined) return null;

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <Grid container>
        <Grid.Row centered column={1}>
          <Grid.Column style={{ maxWidth: 480 }}>
            <Header as="h4" attached="top" block>
              Đăng nhập
            </Header>
            <Segment attached>
              <LoginForm onSuccess={handleSuccess} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
