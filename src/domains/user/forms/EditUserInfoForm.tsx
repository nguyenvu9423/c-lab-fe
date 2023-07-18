import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LoadingIndicator } from '../../../components';
import { UserService } from '../../../services/UserService';
import { State } from '../../../store';
import { fetchUser, resetState } from '../../../store/actions';
import { DataHolder } from '../../../store/reducers/data-holders/shared';
import { Target } from '../../../store/reducers/target';
import { ConstSelectors, UserSelectors } from '../../../store/selectors';
import { UserInfoForm } from './UserInfoForm';

export namespace EditUserInfoForm {
  export interface Props {
    username: string;
  }
}

export const EditUserInfoForm: React.FC<EditUserInfoForm.Props> = (props) => {
  const { username } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state: State) => state.editUserInfoForm);
  const user = useSelector(
    DataHolder.isLoaded(data.user)
      ? UserSelectors.selectById(data.user.result)
      : ConstSelectors.value(undefined)
  );

  const load = React.useCallback(() => {
    dispatch(
      fetchUser.request({
        type: 'byUsername',
        username,
        target: Target.EDIT_USER_INFO_FORM,
      })
    );
  }, [dispatch, username]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.EDIT_USER_INFO_FORM }));
    };
  }, [username]);

  const handleSubmit = React.useCallback(
    (value) => {
      if (user) {
        return UserService.updateInfo(user.username, value).then(() => {
          navigate(`/users/${user.username}`);
        });
      }
    },
    [user]
  );

  return (
    <>
      {DataHolder.isLoading(data.user) && <LoadingIndicator />}
      {DataHolder.isLoaded(data.user) && user && (
        <UserInfoForm
          initialValues={user}
          onCancel={() => {
            navigate(`/users/${user.username}`);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};
