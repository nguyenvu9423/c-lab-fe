import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { useScrollToTop } from '../../common/hooks';
import { EditUserInfoForm } from '../../domains/user';
import { UnknownException } from '../../exception/UnkownException';
import { AuthenticationSelectors } from '../../store/selectors';
import { PageErrorMessage } from '../shared';

export const EditUserInfoPage: React.FC = () => {
  const params = useParams();
  if (!params.username) {
    throw UnknownException.createDefault();
  }
  useScrollToTop();

  const username = useSelector(AuthenticationSelectors.username());
  if (username !== params.username) {
    return <PageErrorMessage message="Bạn không có quyền truy cập trang này" />;
  }

  return (
    <Grid container>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 560 }}>
          <Segment clearing>
            <Header as="h2">Sửa thông tin</Header>
            <EditUserInfoForm username={params.username} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
