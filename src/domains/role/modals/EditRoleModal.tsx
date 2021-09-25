import * as React from 'react';
import { Label, Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { EditRoleForm } from '../forms';

export const EditRoleModal: React.FC<FormModal.Props & { roleId: number }> = (
  props
) => {
  return (
    <Modal defaultOpen onClose={props.onCancel}>
      <Modal.Header>
        Edit role <Label>#{props.roleId}</Label>
      </Modal.Header>
      <Modal.Content>
        <EditRoleForm
          roleId={props.roleId}
          onCancel={props.onCancel}
          onSuccess={props.onSuccess}
        />
      </Modal.Content>
    </Modal>
  );
};
