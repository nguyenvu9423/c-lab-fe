import * as React from 'react';
import {
  Header,
  List,
  Message,
  Portal,
  Segment,
  TransitionablePortal
} from 'semantic-ui-react';

class ToastGroup extends React.Component {
  constructor(props) {
    super(props);
    this.currentMaxKey = 0;
    this.state = {
      toastList: []
    };
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentDidMount() {
    // this.addToast({
    //   onDismiss: this.handleDismiss,
    //   header: 'Welcome back!',
    //   content: 'This is a special notification which you can dismiss.'
    // });
    // setTimeout(() => {
    //   this.addToast({
    //     onDismiss: this.handleDismiss,
    //     info: true,
    //     header: 'Welcome back!',
    //     content: 'This is a special notification which you can dismiss.'
    //   });
    // }, 3000);
  }

  addToast(props) {
    let key = ++this.currentMaxKey;
    let newToast = { key: key, ...props };
    let { toastList } = this.state;
    toastList.push(newToast);
    this.setState({ toastList });
  }

  handleDismiss(event, data) {
    let { toastList } = this.state;
    toastList = toastList.filter(toast => toast.key !== data.toastKey);
    this.setState({ toastList });
  }

  renderAllActiveToast() {
    let { toastList } = this.state;
    return (
      <React.Fragment>
        {toastList.reverse().map(toast => {
          const key = toast.key;
          return (
            <List.Item key={key}>
              <Message toastKey={key} className={'toast'} {...toast} />
            </List.Item>
          );
        })}
      </React.Fragment>
    );
  }

  render() {
    return (
      <Portal defaultOpen closeOnEscape={false} closeOnDocumentClick={false}>
        <List style={{ position: 'fixed', bottom: 14, right: 14 }}>
          {this.renderAllActiveToast()}
        </List>
      </Portal>
    );
  }
}

const toastGroup = <ToastGroup />;
export { toastGroup };
