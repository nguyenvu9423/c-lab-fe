import * as React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export const LoadingIndicator: React.FC = () => {
  return (
    <Dimmer active inverted>
      <Loader size="medium" />
    </Dimmer>
  );
};
