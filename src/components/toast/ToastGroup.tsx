import * as React from 'react';
import { Portal, Segment, Header, Button, List } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store';
import { removeToast, NotificationToast } from '../../store/actions/toast';

export const ToastGroup: React.FC = () => {
  const toasts = useSelector((state: State) => state.toasts);

  return (
    <Portal defaultOpen closeOnEscape={false} closeOnDocumentClick={false}>
      <List id="toast-group">
        {toasts.map((toast, id) => (
          <NotificationToast key={id} toast={toast} />
        ))}
      </List>
    </Portal>
  );
};

const NotificationToast: React.FC<{ toast: NotificationToast }> = (props) => {
  const { toast } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (toast.duration) {
      setTimeout(() => dispatch(removeToast({ id: toast.id })), toast.duration);
    }
  }, []);

  const color =
    toast.status === 'positive'
      ? 'green'
      : toast.status === 'negative'
      ? 'red'
      : undefined;

  return (
    <Segment key={toast.id} clearing color={color}>
      <Header>{toast.header}</Header>
      <p>{toast.content}</p>

      <Button
        content="Ok"
        floated="right"
        onClick={() => dispatch(removeToast({ id: toast.id }))}
      />
    </Segment>
  );
};
