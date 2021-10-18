import * as React from 'react';
import { Label, Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { UpdateJudgeConfigForm } from '../../judge-config';

export const UpdateJudgeConfigModal: React.FC<
  FormModal.Props & { problemCode: string }
> = ({ problemCode, onCancel, onSuccess }) => {
  return (
    <Modal defaultOpen closeIcon onClose={onCancel} size="large">
      <Modal.Header>
        Cài đặt chấm bài <Label>{problemCode}</Label>
      </Modal.Header>
      <Modal.Content>
        <UpdateJudgeConfigForm
          problemCode={problemCode}
          onSuccess={onSuccess}
        />
      </Modal.Content>
    </Modal>
  );
};
