import * as React from 'react';
import { match } from 'react-router';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { EditUserInfoForm } from '../../domains/user';

export const EditUserPage: React.FC<{ match: match<{ username: string }> }> = (
  props
) => {
  const {
    match: {
      params: { username },
    },
  } = props;

  return (
    <Grid container>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 560 }}>
          <Segment clearing>
            <Header as="h2">Update info</Header>
            <EditUserInfoForm username={username} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
