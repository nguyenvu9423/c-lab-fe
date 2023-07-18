import * as React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import { useScrollToTop } from '../../shared/hooks';
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
    <>
      <Helmet>
        <title>Yêu cầu đổi mật khẩu</title>
      </Helmet>
      <Grid container>
        <Grid.Row centered>
          {!success ? (
            <Grid.Column width="6">
              <Header as="h3" content="Thay đổi mật khẩu" attached="top" />
              <Segment attached="bottom">
                <ResetPasswordRequestForm onSuccess={handleSuccess} />
              </Segment>
            </Grid.Column>
          ) : (
            <Grid.Column width="6">
              <Segment color="green">
                <Header as="h3">Yêu cầu đổi mật khẩu</Header>
                <p>
                  Một email đã được gửi đến địa chỉ của bạn tại:{' '}
                  <u>{success.email}</u>
                  <br />
                  Vui lòng làm theo sự hướng dẫn đề cập trong email này để thay
                  đổi mật khẩu
                </p>
              </Segment>
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
};
