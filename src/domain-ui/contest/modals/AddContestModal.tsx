import React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '@/shared/types';
import { AddContestForm } from '../forms';

export const AddContestModal: React.FC<FormModal.Props> = ({
  onCancel,
  onSuccess,
}) => {
  return (
    <Modal defaultOpen closeIcon onClose={onCancel}>
      <Modal.Header>Tạo bài</Modal.Header>
      <Modal.Content scrolling>
        <AddContestForm onSuccess={onSuccess} />
      </Modal.Content>
    </Modal>
  );
};
