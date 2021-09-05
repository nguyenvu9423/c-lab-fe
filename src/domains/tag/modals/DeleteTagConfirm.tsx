import * as React from 'react';
import { Message, Modal, Button } from 'semantic-ui-react';
import { TagService } from '../../../service/TagService';
import { CancelButton } from '../../../components/button';
import { WarningRequestException } from '../../../exception/WarningRequestException';
import { LoadingIndicator } from '../../../components';

export namespace DeleteTagConfirm {
  export interface Props {
    tagId: number;
    onCancel?(): void;
    onSuccess?(): void;
  }
}

export const DeleteTagConfirm: React.FC<DeleteTagConfirm.Props> = (props) => {
  const { tagId, onCancel, onSuccess } = props;
  const [warning, setWarning] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState(false);

  const handleDelete = React.useCallback(
    (forced?: boolean) => {
      setLoading(true);
      return TagService.deleteTag(tagId, forced)
        .then(() => {
          setLoading(false);
          onSuccess?.();
        })
        .catch((e) => {
          setLoading(false);
          if (WarningRequestException.isInstance(e)) {
            setWarning(`${e.message}. Do you want to procced?`);
          }
        });
    },
    [tagId, onSuccess]
  );

  return (
    <Modal defaultOpen onClose={onCancel}>
      <Modal.Header>Delete Tag</Modal.Header>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Modal.Content>
            <p>Are you sure that you want to delete this tag?</p>
            {warning && <Message icon="warning" warning content={warning} />}
          </Modal.Content>
          <Modal.Actions className="clear-fix-container">
            {!warning ? (
              <Button
                floated="right"
                content="Confirm"
                onClick={() => handleDelete()}
              />
            ) : (
              <Button
                floated="right"
                content="Confirm"
                color="yellow"
                onClick={() => handleDelete(true)}
              />
            )}
            <CancelButton floated="right" onClick={onCancel} />
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
};
