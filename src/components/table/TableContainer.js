import * as React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export function TableContainer(props) {
  const { loading, style } = props;
  return (
    <Dimmer.Dimmable className="table-container" style={style} dimmed={loading}>
      {props.children}
      <Dimmer active={loading} inverted>
        <Loader />
      </Dimmer>
    </Dimmer.Dimmable>
  );
}
