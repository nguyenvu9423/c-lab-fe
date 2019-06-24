import * as React from 'react';
import { Message } from 'semantic-ui-react';

class FormErrorMessage extends React.Component {
  render() {
    const { content } = this.props;
    return <Message size={'tiny'} error content={content} />;
  }
}

export { FormErrorMessage };
