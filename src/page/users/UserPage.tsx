import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { match } from 'react-router';

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

export const UserPage: React.FC<{ match: match<{ username: string }> }> = (
  props
) => {
  const {
    match: { params },
  } = props;
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
        username: params.username,
        target: Target.USER_PAGE,
      })
    );
    return () => {
      dispatch(resetState({ target: Target.USER_PAGE }));
    };
  }, [dispatch, params.username]);

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
            {isPrincipal && !user.emailVerified && <UnverifiedEmailSection />}
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
        You accout is not activated yet. Please verify your email to activate it
      </p>
      <p>Or click the below button if you have not received it:</p>
      <Button
        icon="send"
        content="Resend email"
        onClick={() => {
          EmailVerificationService.resend().then(() =>
            dispatch(
              addToast({
                header: 'Resend email',
                content: 'Verfication email has been sent successfully',
                duration: 2500,
              })
            )
          );
        }}
      />
    </Segment>
  );
};
