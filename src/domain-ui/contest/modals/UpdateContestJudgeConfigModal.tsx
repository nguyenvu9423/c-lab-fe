import * as React from 'react';
import { Label, Modal } from 'semantic-ui-react';
import { FormModal } from '../../../shared/types';
import { UpdateContestJudgeConfigForm } from '../forms';

export namespace UpdateContestJudgeConfigModal {
  export interface Props extends FormModal.Props {
    contestId: number;
  }
}

export const UpdateContestJudgeConfigModal: React.FC<
  UpdateContestJudgeConfigModal.Props
> = ({ contestId, onCancel, onSuccess }) => {
  return (
    <Modal defaultOpen closeIcon onClose={onCancel} size="large">
      <Modal.Header>
        Cài đặt chấm bài kỳ thi <Label>#{contestId}</Label>
      </Modal.Header>
      <Modal.Content>
        <UpdateContestJudgeConfigForm
          contestId={contestId}
          onSuccess={onSuccess}
        />
      </Modal.Content>
    </Modal>
  );
};
