import * as React from 'react';
import { Message } from 'semantic-ui-react';

class FormErrorMessage extends React.Component {
  static connectProps(wrapper, BaseErrorMessage) {
    return function (props) {
      const { name } = props;
      const { touched, errors, status } = wrapper.props;
      if (touched[name]) {
        if (errors[name]) return <BaseErrorMessage content={errors[name]} />;
        if (status && status.errors[name]) {
          return <BaseErrorMessage content={status.errors[name]} />;
        }
      }
      return null;
    };
  }
  render() {
    const { content } = this.props;
    return <Message size={'tiny'} error content={content} />;
  }
}

export { FormErrorMessage };
