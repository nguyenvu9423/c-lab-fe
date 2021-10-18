import * as React from 'react';
import { useSelector } from 'react-redux';
import { match } from 'react-router';
import { Grid, Header, Segment } from 'semantic-ui-react';
import {} from '../../components';
import { EditUserInfoForm } from '../../domains/user';
import { AuthenticationSelectors } from '../../store/selectors';
import { PageErrorMessage } from '../shared';

export const EditUserInfoPage: React.FC<{
  match: match<{ username: string }>;
}> = (props) => {
  const {
    match: { params },
  } = props;

  const username = useSelector(AuthenticationSelectors.username());
  if (username !== params.username) {
    return (
      <PageErrorMessage message="You do not have permission to access this page" />
    );
  }

  return (
    <Grid container>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 560 }}>
          <Segment clearing>
            <Header as="h2">Sửa thông tin</Header>
            <EditUserInfoForm username={username} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
