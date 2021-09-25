import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Target } from '../../../store/reducers/target';
import { fetchUser } from '../../../store/actions';
import { UserSelectors } from '../../../store/selectors';
import { LoadingIndicator } from '../../../components';
import { LoadingState } from '../../../store/common';
import { UserForm } from './UserForm';
import { UserService } from '../../../service/UserService';
import { State } from '../../../store';
import { DataHolderState } from '../../../store/reducers/data-holders/shared';

export namespace EditUserForm {
  export interface Props {
    username: string;
    onCancel?: () => void;
    onSuccess?: () => void;
  }
}

export const EditUserForm: React.FC<EditUserForm.Props> = (props) => {
  const { username, onCancel, onSuccess } = props;
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.editUserForm);

  const user = useSelector(
    DataHolderState.isLoaded(data.user)
      ? UserSelectors.selectById(data.user.result)
      : () => undefined
  );

  React.useEffect(() => {
    dispatch(
      fetchUser.request({
        type: 'byUsername',
        username,
        target: Target.EDIT_USER_FORM,
      })
    );
  }, [dispatch, username]);

  const handleSubmit = React.useCallback(
    (values) => {
      return UserService.update(username, values).then(() => {
        onSuccess?.();
      });
    },
    [onSuccess, username]
  );

  if (LoadingState.isInProgress(data.user.loadingState) || !user) {
    return <LoadingIndicator />;
  }

  return (
    <UserForm
      initialValues={user}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
};
