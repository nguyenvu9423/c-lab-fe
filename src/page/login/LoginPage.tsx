import * as React from 'react';

import { useSelector } from 'react-redux';

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
    const prevPath = (location.state as any).prevPath;
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
  );
};
