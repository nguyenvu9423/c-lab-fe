import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { Button, Grid, Header, Segment } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import { useScrollToTop } from '../../shared/hooks';
import { ErrorMessage, LoadingIndicator } from '@/components';
import { PageErrorMessage } from '../shared';
import { State } from '../../store';
import { DataHolderState } from '../../store/reducers/data-holders/shared';
import { verifyEmail } from '../../store/actions';
import { Target } from '../../store/reducers/target';

export const EmailVerificationPage: React.FC = () => {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data } = useSelector((state: State) => state.emailVerificationPage);

  React.useEffect(() => {
    if (id && typeof id === 'string') {
      dispatch(
        verifyEmail.request({ id, target: Target.EMAIL_VERIFICATION_PAGE }),
      );
    }
  }, [id, dispatch]);

  if (!id) {
    return <PageErrorMessage message="Yêu cầu xác nhận email không tồn tại" />;
  }

  return (
    <>
      <Helmet>
        <title>Xác nhận email</title>
      </Helmet>
      <Grid container>
        <Grid.Row centered>
          <Grid.Column style={{ maxWidth: 420 }}>
            {DataHolderState.isLoading(data.emailVerification) && (
              <LoadingIndicator />
            )}
            {DataHolderState.isError(data.emailVerification) && (
              <ErrorMessage message={data.emailVerification.error.message} />
            )}
            {DataHolderState.isLoaded(data.emailVerification) && (
              <Segment color="green">
                <Header content="Xác nhận email" />
                <p>Email của bạn đã được xác nhận thành công</p>
                {data.emailVerification.hasRefreshedToken === false && (
                  <>
                    <p>
                      <strong>Lưu ý: </strong> Bạn cần đăng nhập lại để nhận
                      được sự thay đổi.
                    </p>
                    <Button
                      content="Log out"
                      onClick={() => navigate('/logout')}
                    />
                  </>
                )}
              </Segment>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
