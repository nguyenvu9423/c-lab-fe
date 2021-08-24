import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { ErrorMessage, LoadingIndicator } from '../../components';
import { EmailVerificationService } from '../../service/EmailVerificationService';
import { AuthenticationSelectors } from '../../store/selectors';
import { PageErrorMessage } from '../shared';

type Result = { error?: false } | { error: true; message: string };

export const EmailVerificationPage: React.FC = () => {
  const match = useRouteMatch<{ id: string }>('/email-verification/:id');
  const id = match?.params.id;

  const history = useHistory();
  const [result, setResult] = React.useState<Result | undefined>();
  const isAuthenticated = useSelector(
    AuthenticationSelectors.isAuthenticated()
  );

  React.useEffect(() => {
    if (id && typeof id === 'string') {
      EmailVerificationService.verify(id)
        .then(() => {
          setResult({});
        })
        .catch((e) => {
          setResult({ error: true, message: e.message });
        });
    }
  }, [id]);

  if (!id) {
    return (
      <PageErrorMessage message="Email verification is invalid or expired" />
    );
  }

  if (!result) {
    return <LoadingIndicator />;
  }

  return (
    <Grid container>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 420 }}>
          {!result.error ? (
            <Segment color="green">
              <Header content="Email verification" />
              <p>Your email has been verified successfully</p>
              {isAuthenticated && (
                <>
                  <p>
                    <strong>Note: </strong>You need to log out and log in again
                    to be fully verified
                  </p>
                  <Button
                    content="Log out"
                    onClick={() => history.push('/logout')}
                  />
                </>
              )}
            </Segment>
          ) : (
            <ErrorMessage message={result.message} />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
