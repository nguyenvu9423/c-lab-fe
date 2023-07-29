import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormModal } from '../../../shared/types';
import { AddArticleForm } from '../forms';

export const AddArticleModal: React.FC<FormModal.Props> = (props) => {
  return (
    <Modal defaultOpen onClose={props.onCancel} closeIcon>
      <Modal.Header>Add article</Modal.Header>
      <Modal.Content scrolling>
        <AddArticleForm onCancel={props.onCancel} onSuccess={props.onSuccess} />
      </Modal.Content>
    </Modal>
  );
};
