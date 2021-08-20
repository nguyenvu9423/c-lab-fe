import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { UpdateJudgeConfigForm } from '../../judge-config';

export const UpdateJudgeConfigModal: React.FC<
  FormModal.Props & { problemId: number }
> = ({ problemId, onCancel, onSuccess }) => {
  return (
    <Modal defaultOpen closeIcon onClose={onCancel} size="large">
      <Modal.Header>Edit Problem</Modal.Header>
      <Modal.Content scrolling style={{ height: 629 }}>
        <UpdateJudgeConfigForm problemId={problemId} onSuccess={onSuccess} />
      </Modal.Content>
    </Modal>
  );
};
