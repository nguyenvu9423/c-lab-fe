import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { AddProblemForm } from '../forms';

export const AddProblemModal: React.FC<FormModal.Props> = ({
  onCancel,
  onSuccess,
}) => {
  return (
    <Modal defaultOpen closeIcon onClose={onCancel}>
      <Modal.Header>Tạo bài</Modal.Header>
      <Modal.Content scrolling>
        <AddProblemForm onCancel={onCancel} onSuccess={onSuccess} />
      </Modal.Content>
    </Modal>
  );
};
