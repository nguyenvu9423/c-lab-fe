import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Target } from '../../store/reducers/target';
import { fetchUser } from '../../store/actions';
import { UserSelectors } from '../../store/selectors';
import { LoadingIndicator } from '../../components';
import { LoadingState } from '../../store/common';
import { UserForm } from './UserForm';
import { UserService } from '../../service/UserService';

export function EditUserForm(props) {
  const { userId, onCancel, onSuccess } = props;
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.editUserForm);

  const user = useSelector(UserSelectors.byId(data.user.id));

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    dispatch(
      fetchUser.request({ id: userId }, { target: Target.EDIT_USER_FORM })
    );
  }, []);

  const handleSubmit = React.useCallback((values) => {
    setIsSubmitting(true);
    UserService.updateUserDetails(userId, values)
      .then(() => {
        setIsSubmitting(false);
        onSuccess?.();
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  }, []);

  if (LoadingState.isInProgress(data.user.loadingState)) {
    return <LoadingIndicator />;
  }

  return (
    <UserForm
      initialValues={user}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
