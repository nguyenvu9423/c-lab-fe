import * as React from 'react';
import { Label, Modal } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { EditArticleForm } from '../forms';

export const EditArticleModal: React.FC<
  FormModal.Props & { articleId: number }
> = (props) => {
  return (
    <Modal defaultOpen onClose={props.onCancel}>
      <Modal.Header>
        Edit article <Label>#{props.articleId}</Label>
      </Modal.Header>
      <Modal.Content scrolling>
        <EditArticleForm
          articleId={props.articleId}
          onCancel={props.onCancel}
          onSuccess={props.onSuccess}
        />
      </Modal.Content>
    </Modal>
  );
};
