import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '../../../shared/types';
import { AddRoleForm } from '../forms';

export const AddRoleModal: React.FC<FormModal.Props> = (props) => {
  return (
    <Modal defaultOpen onClose={props.onCancel}>
      <Modal.Header>Tạo vai trò</Modal.Header>
      <Modal.Content>
        <AddRoleForm onCancel={props.onCancel} onSuccess={props.onSuccess} />
      </Modal.Content>
    </Modal>
  );
};
