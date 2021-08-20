import * as React from 'react';

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, Header, Segment } from 'semantic-ui-react';
import { LoginForm } from './LogInForm';
import { AuthenticationSelectors } from '../../store/selectors';

export function LoginPage() {
  const history = useHistory();
  const handleSuccess = React.useCallback(() => {
    // @ts-ignore
    const prevPath = history.location.state.prevPath;
    if (prevPath) {
      history.goBack();
    } else {
      history.push('/');
    }
  }, [history]);

  const authenticated = useSelector(AuthenticationSelectors.isAuthenticated());

  React.useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
  }, [authenticated]);

  if (authenticated || authenticated === undefined) return null;

  return (
    <Grid container>
      <Grid.Row centered column={1}>
        <Grid.Column style={{ maxWidth: 480 }}>
          <Header as="h4" attached="top" block>
            Login
          </Header>
          <Segment attached>
            <LoginForm onSuccess={handleSuccess} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
