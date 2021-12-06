import * as React from 'react';
import * as qs from 'qs';

import { Grid, Header, Segment } from 'semantic-ui-react';
import { ResetPasswordForm } from '../../domains/user';
import { useScrollToTop } from '../../common/hooks';
import { useLocation } from 'react-router';

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
    <Grid container doubling>
      <Grid.Row centered>
        {!succedded ? (
          <Grid.Column width={6}>
            <Header as="h3" content="Reset password" attached="top" />
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
              <Header>Reset password</Header>
              <p>You have set the new password successfully!</p>
            </Segment>
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};
