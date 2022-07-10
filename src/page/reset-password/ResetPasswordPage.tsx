import * as React from 'react';
import * as qs from 'qs';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet';

import { ResetPasswordForm } from '../../domains/user';
import { useScrollToTop } from '../../common/hooks';

export const ResetPasswordPage: React.FC = () => {
  const location = useLocation();
  useScrollToTop();

  const [succedded, setSuccedded] = React.useState(false);

  const { id, token } = React.useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location.search]
  );

  const handleSuccess = React.useCallback(() => {
    setSuccedded(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Đổi mật khẩu</title>
      </Helmet>
      <Grid container doubling>
        <Grid.Row centered>
          {!succedded ? (
            <Grid.Column width={6}>
              <Header as="h3" content="Thay đổi mật khẩu" attached="top" />
              <Segment attached="bottom">
                <ResetPasswordForm
                  id={id as string}
                  token={token as string}
                  onSuccess={handleSuccess}
                />
              </Segment>
            </Grid.Column>
          ) : (
            <Grid.Column width={6}>
              <Segment color="green">
                <Header>Thay đổi mật khẩu</Header>
                <p>Bạn đã thay đổi mật khẩu thành công</p>
              </Segment>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
};
