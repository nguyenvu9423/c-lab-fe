import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { ProblemRejudgeForm } from '../forms';

export const RejudgeProblemModal: React.FC<
  FormModal.Props & { problemId: number }
> = ({ problemId, onCancel }) => {
  return (
    <Modal defaultOpen closeIcon onClose={onCancel} size="large">
      <Modal.Header>Edit Problem</Modal.Header>
      <Modal.Content scrolling style={{ height: 420 }}>
        <ProblemRejudgeForm problemId={problemId} />
      </Modal.Content>
    </Modal>
  );
};
