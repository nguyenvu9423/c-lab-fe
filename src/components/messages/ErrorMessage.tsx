import * as React from 'react';
import { Message } from 'semantic-ui-react';

export const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <Message
      icon="warning circle"
      error
      header="Error"
      content={message ? message : 'Bad request'}
    />
  );
};
