import * as React from 'react';
import { Message } from 'semantic-ui-react';

export function ErrorMessage({ message }) {
  return (
    <Message
      icon="warning circle"
      error
      header="Error"
      content={message ? message : 'Bad request'}
    />
  );
}

export function NotFoundPageMessage() {
  return (
    <Message
      icon="warning circle"
      error
      header="404 Error"
      content={'Page not found'}
    />
  );
}
