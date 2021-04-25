import * as React from 'react';
import { LoginForm } from './LogInForm';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export function LoginPage() {
  const history = useHistory();

  const handleSuccess = React.useCallback(() => {
    history.goBack();
  }, [history]);

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
