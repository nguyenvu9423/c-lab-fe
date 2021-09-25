import * as React from 'react';
import { Message } from 'semantic-ui-react';

export const NotFoundPageMessage: React.FC = () => {
  return (
    <Message
      icon="warning circle"
      error
      header="404 Error"
      content={'Page not found'}
    />
  );
};
