import * as React from 'react';
import { Message, Modal, Button, Dimmer, Loader } from 'semantic-ui-react';
import { TagService } from '../../service/TagService';
import { ExceptionTypes } from '../../exception/ExceptionTypes';
import { CancelButton, SubmitButton } from '../../components/button';

export function DeleteTagConfirm(props) {
  const { tagId, onCancel, onSuccess } = props;
  const [warning, setWarning] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const handleDelete = React.useCallback(() => {
    setLoading(true);
    TagService.deleteTag(tagId)
      .then(() => {
        setLoading(false);
        onSuccess?.();
      })
      .catch(e => {
        const {
          response: { data }
        } = e;
        if (data && data.type === ExceptionTypes.WARNING) {
          setWarning(data.message);
        }
        setLoading(false);
      });
  }, []);

  const handleDeleteWithoutWarning = React.useCallback(() => {
    TagService.deleteTag(tagId, true).then(() => onSuccess?.());
  });

  return (
    <Dimmer.Dimmable as={Modal} open={true} dimmed={loading}>
      <Modal.Header>Delete Tag</Modal.Header>
      <Modal.Content>
        {!warning ? (
          'Are you sure ?'
        ) : (
          <Message warning>
            <Message.Header>{warning}</Message.Header>
            <p> Do you want to proceed ?</p>
          </Message>
        )}
      </Modal.Content>
      <Modal.Actions className="clear-fix-container">
        {!warning ? (
          <SubmitButton floated="right" onClick={handleDelete} />
        ) : (
          <Button
            floated="right"
            content="Proceed"
            color="yellow"
            onClick={handleDeleteWithoutWarning}
          />
        )}
        <CancelButton floated="right" onClick={onCancel} />
      </Modal.Actions>
      <Dimmer active={loading} inverted>
        <Loader />
      </Dimmer>
    </Dimmer.Dimmable>
  );
}
