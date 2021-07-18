import * as React from 'react';
import { normalize } from 'normalizr';
import { useDispatch, useSelector } from 'react-redux';
import { RoleForm } from './RoleForm';
import { fetchRole, resetState, updateEntity } from '../../store/actions';
import { RoleSelectors } from '../../store/selectors';
import { LoadingState } from '../../store/common';
import { LoadingIndicator } from '../../components';
import { Target } from '../../store/reducers/target';
import { RoleService } from '../../service/RoleService';
import { roleSchema } from '../../entity-schemas';
import { State } from '../../store';

export const EditRoleForm: React.FC<{
  roleId: number;
  onCancel: any;
  onSuccess: any;
}> = (props) => {
  const { roleId, onCancel, onSuccess } = props;
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const dispatch = useDispatch();
  const load = React.useCallback((id) => {
    dispatch(fetchRole.request({ id, target: Target.EDIT_ROLE_FORM }));
  }, []);

  const { data } = useSelector((state: State) => state.editRoleForm);

  const role = useSelector(
    data.role.loadingState === LoadingState.LOADED
      ? RoleSelectors.byId(data.role.result)
      : () => undefined
  );

  React.useEffect(() => {
    load(roleId);
    return () => {
      dispatch(resetState({ target: Target.EDIT_ROLE_FORM }));
    };
  }, [roleId]);

  const handleSubmit = React.useCallback((values) => {
    setIsSubmitting(true);
    RoleService.updateRole(roleId, values).then(({ data }) => {
      const { entities } = normalize(data, roleSchema);
      dispatch(updateEntity({ entities }));
      setIsSubmitting(false);
      onSuccess?.();
    });
  }, []);

  if (LoadingState.isInProgress(data.role.loadingState)) {
    return <LoadingIndicator />;
  }

  return (
    <RoleForm
      initialRole={role}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
};
