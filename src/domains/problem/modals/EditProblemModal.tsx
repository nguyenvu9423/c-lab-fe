import * as React from 'react';
import { Label, Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { EditProblemForm } from '../forms';

export const EditProblemModal: React.FC<
  FormModal.Props & { problemCode: string }
> = ({ problemCode, onCancel, onSuccess }) => {
  return (
    <Modal defaultOpen closeIcon onClose={onCancel} size="large">
      <Modal.Header>
        Sửa bài <Label>{problemCode}</Label>
      </Modal.Header>
      <Modal.Content>
        <EditProblemForm problemCode={problemCode} onSuccess={onSuccess} />
      </Modal.Content>
    </Modal>
  );
};
