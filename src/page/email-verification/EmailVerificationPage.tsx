import * as qs from 'qs';
import * as React from 'react';
import { useRouteMatch } from 'react-router';
import { Button, Container, Grid, Header, Segment } from 'semantic-ui-react';
import { ErrorMessage, LoadingIndicator } from '../../components';
import { EmailVerificationService } from '../../service/EmailVerificationService';

type Result = { error?: false } | { error: true; message: string };

export const EmailVerificationPage: React.FC<{ location: Location }> = (
  props
) => {
  const match = useRouteMatch<{ id: string }>('/email-verification/:id');
  const id = match?.params.id;

  const [result, setResult] = React.useState<Result | undefined>();

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
      <Container>
        <ErrorMessage message="Page not found" />
      </Container>
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
              <p>
                Your email has been verified successfully. Please{' '}
                <strong>log out and login again</strong> to receive the effect.
              </p>
              <Button content="Log out" />
            </Segment>
          ) : (
            <ErrorMessage message={result.message} />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
