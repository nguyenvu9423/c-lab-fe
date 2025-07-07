import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '../../../shared/types';
import { ContestRejudgeForm } from '../forms';

export namespace RejudgeContestModal {
  export interface Props extends FormModal.Props {
    contestId: number;
  }
}

export const RejudgeContestModal: React.FC<RejudgeContestModal.Props> = ({
  contestId,
  onCancel,
}) => {
  return (
    <Modal defaultOpen closeIcon onClose={onCancel} size="large">
      <Modal.Header>Chấm lại kỳ thi</Modal.Header>
      <Modal.Content scrolling style={{ height: 420 }}>
        <ContestRejudgeForm contestId={contestId} />
      </Modal.Content>
    </Modal>
  );
};
