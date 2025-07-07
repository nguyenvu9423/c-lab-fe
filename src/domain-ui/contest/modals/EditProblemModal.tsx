import React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '@/shared/types';
import { EditContestForm } from '../forms';

export namespace EditContestModal {
  export interface Props extends FormModal.Props {
    contestId: number;
  }
}

export const EditContestModal: React.FC<EditContestModal.Props> = ({
  contestId,
  onCancel,
  onSuccess,
}) => {
  return (
    <Modal defaultOpen closeIcon onClose={onCancel} size="large">
      <Modal.Header>Sửa kỳ thi #{contestId}</Modal.Header>
      <Modal.Content>
        <EditContestForm contestId={contestId} onSuccess={onSuccess} />
      </Modal.Content>
    </Modal>
  );
};
