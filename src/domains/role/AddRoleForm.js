import * as React from 'react';
import { normalize } from 'normalizr';
import { useDispatch } from 'react-redux';
import { RoleForm } from './RoleForm';
import { updateEntity } from '../../store/actions';
import { RoleService } from '../../service/RoleService';
import { roleSchema } from '../../entity-schemas';

export function AddRoleForm(props) {
  const { onCancel, onSuccess } = props;
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const dispatch = useDispatch();

  const handleSubmit = React.useCallback(values => {
    setIsSubmitting(true);
    RoleService.addRole(values).then(({ data }) => {
      const { entities } = normalize(data, roleSchema);
      dispatch(updateEntity(entities));
      setIsSubmitting(false);
      onSuccess?.();
    });
  }, []);

  return (
    <RoleForm
      onCancel={onCancel}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
