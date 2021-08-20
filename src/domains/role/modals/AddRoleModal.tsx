import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { AddRoleForm } from '../forms';

export const AddRoleModal: React.FC<FormModal.Props> = (props) => {
  return (
    <Modal defaultOpen onClose={props.onCancel}>
      <Modal.Header>Add article</Modal.Header>
      <Modal.Content>
        <AddRoleForm onCancel={props.onCancel} onSuccess={props.onSuccess} />
      </Modal.Content>
    </Modal>
  );
};
