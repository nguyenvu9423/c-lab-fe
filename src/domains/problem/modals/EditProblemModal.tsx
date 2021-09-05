import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { EditProblemForm } from '../forms';

export const EditProblemModal: React.FC<
  FormModal.Props & { problemCode: string }
> = ({ problemCode, onCancel, onSuccess }) => {
  return (
    <Modal defaultOpen closeIcon onClose={onCancel} size="large">
      <Modal.Header>Edit Problem</Modal.Header>
      <Modal.Content scrolling style={{ height: 629 }}>
        <EditProblemForm problemCode={problemCode} onSuccess={onSuccess} />
      </Modal.Content>
    </Modal>
  );
};
