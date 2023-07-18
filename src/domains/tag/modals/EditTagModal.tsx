import * as React from 'react';
import { Label, Modal } from 'semantic-ui-react';
import { FormModal } from '../../../shared/types';
import { EditTagForm } from '../forms';

export const EditTagModal: React.FC<FormModal.Props & { tagId: number }> = (
  props
) => {
  const { tagId } = props;
  return (
    <Modal defaultOpen onClose={props.onCancel}>
      <Modal.Header>
        Update tag <Label>#{tagId}</Label>
      </Modal.Header>
      <Modal.Content>
        <EditTagForm
          tagId={tagId}
          onCancel={props.onCancel}
          onSuccess={props.onSuccess}
        />
      </Modal.Content>
    </Modal>
  );
};
