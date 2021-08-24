import * as React from 'react';

import { Container, Message } from 'semantic-ui-react';

export const PageErrorMessage: React.FC<{ message: string }> = (props) => {
  return (
    <Container>
      <Message error header="Error" icon="warning" content={props.message} />
    </Container>
  );
};
