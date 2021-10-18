import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { AddTagForm } from '../forms';

export const AddTagModal: React.FC<FormModal.Props> = (props) => {
  return (
    <Modal defaultOpen onClose={props.onCancel}>
      <Modal.Header>Tạo nhãn</Modal.Header>
      <Modal.Content>
        <AddTagForm onCancel={props.onCancel} onSuccess={props.onSuccess} />
      </Modal.Content>
    </Modal>
  );
};
