import * as React from 'react';
import { match, useHistory } from 'react-router';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { EditUserPasswordForm } from '../../domains/user';

export const EditUserPasswordPage: React.FC<{
  match: match<{ username: string }>;
}> = (props) => {
  const {
    match: {
      params: { username },
    },
  } = props;

  const history = useHistory();
  return (
    <Grid container>
      <Grid.Row centered columns={1}>
        <Grid.Column style={{ maxWidth: 560 }}>
          <Segment clearing>
            <Header as="h2">Change password</Header>
            <EditUserPasswordForm
              onCancel={() => {
                history.push(`/users/${username}`);
              }}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
