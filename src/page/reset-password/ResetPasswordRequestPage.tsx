import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { useScrollToTop } from '../../common/hooks';
import {
  ResetPasswordRequestForm,
  ResetPasswordResponseDTO,
} from '../../domains/user';

export const ResetPasswordRequestPage: React.FC = () => {
  useScrollToTop();

  const [success, setSuccess] = React.useState<
    ResetPasswordResponseDTO | undefined
  >(undefined);

  const handleSuccess = React.useCallback((value: ResetPasswordResponseDTO) => {
    setSuccess(value);
  }, []);

  return (
    <Grid container>
      <Grid.Row centered>
        {!success ? (
          <Grid.Column width="6">
            <Header as="h3" content="Reset password" attached="top" />
            <Segment attached="bottom">
              <ResetPasswordRequestForm onSuccess={handleSuccess} />
            </Segment>
          </Grid.Column>
        ) : (
          <Grid.Column width="6">
            <Segment color="green">
              <Header as="h3">Request successfully</Header>
              <p>
                An email is sent to your email address: <u>{success.email}</u>
                <br />
                Please follow the email instruction to reset the password.
              </p>
            </Segment>
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  );
};
