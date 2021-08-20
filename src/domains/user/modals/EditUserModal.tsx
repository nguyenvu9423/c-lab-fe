import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { EditUserForm } from '../forms';

export const EditUserModal: React.FC<FormModal.Props & { userId: number }> = (
  props
) => {
  return (
    <Modal defaultOpen onClose={props.onCancel}>
      <Modal.Header>Edit user</Modal.Header>
      <Modal.Content scrolling>
        <EditUserForm
          userId={props.userId}
          onCancel={props.onCancel}
          onSuccess={props.onSuccess}
        />
      </Modal.Content>
    </Modal>
  );
};
