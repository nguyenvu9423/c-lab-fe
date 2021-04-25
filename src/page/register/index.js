import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { RegisterForm } from './RegisterForm';

export function RegisterPage() {
  const history = useHistory();

  const handleSuccess = React.useCallback(() => {
    history.push('/login');
  }, [history]);

  return (
    <Grid container>
      <Grid.Row centered columns={1}>
        <Grid.Column style={{ maxWidth: 560 }}>
          <Header as="h3" attached="top" block>
            Register
          </Header>
          <Segment attached>
            <RegisterForm onSuccess={handleSuccess} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
