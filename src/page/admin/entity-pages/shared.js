import * as React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export function TableContainer(props) {
  const { loading } = props;
  return (
    <Dimmer.Dimmable
      className="table-container"
      style={{ height: 572, marginBottom: 14, overflowY: 'auto' }}
      dimmed={loading}
    >
      {props.children}
      <Dimmer active={loading} inverted>
        <Loader />
      </Dimmer>
    </Dimmer.Dimmable>
  );
}
