import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { Grid, Header, Loader, Segment } from 'semantic-ui-react';
import { addToast, logout } from '../../store/actions';
import { AuthenticationSelectors } from '../../store/selectors';
import { LoginForm } from '../login';

export const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isFirstRender = React.useRef(true);

  const isAuthenticated = useSelector(
    AuthenticationSelectors.isAuthenticated()
  );

  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(logout());
      dispatch(
        addToast({
          header: 'Logged out successfully',
          content: 'You have logged out successfully',
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
    return <Redirect to="/" />;
  }

  if (isAuthenticated) {
    return <Loader active content="Logging out" />;
  }

  return (
    <Grid container>
      <Grid.Row centered column={1}>
        <Grid.Column style={{ maxWidth: 480 }}>
          <Header as="h4" attached="top" block>
            Login
          </Header>
          <Segment attached>
            <LoginForm
              onSuccess={() => {
                history.push('/');
              }}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
