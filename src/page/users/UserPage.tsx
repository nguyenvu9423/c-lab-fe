import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Segment } from 'semantic-ui-react';

import { UserProfilePanel } from './components/UserProfilePanel';
import { UserSettingMenu } from './components/UserSettingMenu';
import { fetchUser } from '../../store/actions/user';
import { Target } from '../../store/reducers/target';
import { UserSelectors } from '../../store/selectors/UserSelectors';
import { LoadingIndicator } from '../../components';
import { State } from '../../store';
import { DataHolder } from '../../store/reducers/data-holders/shared';
import { ConstSelectors, PrincipalSelectors } from '../../store/selectors';
import { addToast, resetState } from '../../store/actions';
import { EmailVerificationService } from '../../service/EmailVerificationService';
import { ContactProperties } from '../../config/ContactProperties';
import { useScrollToTop } from '../../common/hooks';
import { useParams } from 'react-router';

export const UserPage: React.FC = () => {
  const { username } = useParams<'username'>();

  if (!username) {
    throw new Error('Not expected');
  }

  useScrollToTop();
  const dispatch = useDispatch();

  const { data } = useSelector((state: State) => state.userPage);
  const user = useSelector(
    DataHolder.isLoaded(data.user)
      ? UserSelectors.selectById(data.user.result)
      : ConstSelectors.value(undefined)
  );

  React.useEffect(() => {
    dispatch(
      fetchUser.request({
        type: 'byUsername',
        username,
        target: Target.USER_PAGE,
      })
    );
    return () => {
      dispatch(resetState({ target: Target.USER_PAGE }));
    };
  }, [dispatch, username]);

  const isPrincipal = useSelector(
    user
      ? PrincipalSelectors.isPrincipal(user)
      : ConstSelectors.value(undefined)
  );

  return (
    <Grid container doubling columns={2}>
      {DataHolder.isLoading(data.user) && <LoadingIndicator />}
      {DataHolder.isLoaded(data.user) && user && (
        <Grid.Row>
          <Grid.Column width={12}>
            {isPrincipal && (
              <>
                {!user.emailVerified && <UnverifiedEmailSection />}
                {user.banned && <BannedUserMessage />}
              </>
            )}
            <UserProfilePanel user={user} />
          </Grid.Column>
          <Grid.Column width={4}>
            {isPrincipal && <UserSettingMenu user={user} />}
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
};

export const UnverifiedEmailSection: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Segment color="yellow">
      <p>
        Tài khoản của bạn chưa được kích hoạt. Vui lòng nhấn vào đường dẫn đính
        kèm trong email kích hoạt.
      </p>
      <p>Hoặc nhấn vào nút sau nếu bạn chưa nhận đc email kích hoạt:</p>
      <Button
        icon="send"
        content="Gửi lại"
        onClick={() => {
          EmailVerificationService.resend().then(() =>
            dispatch(
              addToast({
                header: 'Gửi lại email kích hoạt',
                content: 'Email kích hoạt đã được gửi',
                duration: 2500,
                status: 'positive',
              })
            )
          );
        }}
      />
    </Segment>
  );
};

export const BannedUserMessage: React.FC = () => {
  return (
    <Segment color="yellow">
      <p>
        Tài khoản của bạn đã bị khóa. Để kích hoạt lại tài khoản, vui lòng liên
        hệ với chúng tôi thông qua email: <u>{ContactProperties.email}</u>
      </p>
    </Segment>
  );
};
