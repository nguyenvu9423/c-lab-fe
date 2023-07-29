import * as React from 'react';
import { Label, Modal } from 'semantic-ui-react';
import { FormModal } from '../../../shared/types';
import { EditUserForm } from '../forms';

export const EditUserModal: React.FC<FormModal.Props & { username: string }> = (
  props,
) => {
  return (
    <Modal defaultOpen onClose={props.onCancel}>
      <Modal.Header>
        Sửa thông tin <Label>{props.username}</Label>
      </Modal.Header>
      <Modal.Content>
        <EditUserForm
          username={props.username}
          onCancel={props.onCancel}
          onSuccess={props.onSuccess}
        />
      </Modal.Content>
    </Modal>
  );
};
