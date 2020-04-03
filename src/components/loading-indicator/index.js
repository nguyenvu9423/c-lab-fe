import * as React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export function LoadingIndicator() {
  return (
    <Dimmer active inverted>
      <Loader active />
    </Dimmer>
  );
}
