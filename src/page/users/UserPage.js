import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { UserProfilePanel } from './components/UserProfilePanel';
import { UserSettingMenu } from './components/UserSettingMenu';
import { fetchUser } from '../../store/actions/user';
import { Target } from '../../store/reducers/target';
import { LoadingState } from '../../store/common';
import { UserSelectors } from '../../store/selectors/UserSelectors';
import { LoadingIndicator } from '../../components';

export function UserPage(props) {
  const {
    match: { params },
  } = props;
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state[Target.USER_PAGE]);
  const user = useSelector(UserSelectors.selectById(data.user.id));

  React.useEffect(() => {
    if (data.user.loadingState === LoadingState.LOAD_NEEDED) {
      dispatch(
        fetchUser.request(
          { username: params.username },
          { target: Target.USER_PAGE }
        )
      );
    }
  }, [params.username]);

  if (LoadingState.isInProgress(data.user.loadingState)) {
    return <LoadingIndicator />;
  }

  return (
    <Grid container doubling columns={2}>
      <Grid.Column width={12}>
        <UserProfilePanel user={user} />
      </Grid.Column>
      <Grid.Column width={4}>
        <UserSettingMenu user={user} />
      </Grid.Column>
    </Grid>
  );
}
