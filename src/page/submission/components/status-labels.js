import * as React from 'react';
import { colorMap } from '../../../utility/ColorMap';
import { Loader, Icon } from 'semantic-ui-react';

export function LoadingStatusLabel(props) {
  const { message } = props;
  return (
    <span className="status-label loading">
      <Loader size="tiny" inline active style={{ margin: 8 }} />
      <span>{message}</span>
    </span>
  );
}

export function AcceptedStatusLabel(props) {
  const { message } = props;
  return (
    <span>
      <Icon name="checkmark" style={{ margin: 8 }} color="green" />
      <span style={{ color: colorMap.get('green') }}>{message}</span>
    </span>
  );
}

export function ErrorStatusLabel(props) {
  const { message } = props;
  return (
    <span>
      <Icon style={{ margin: 8 }} name="warning sign" color="red" />
      <span style={{ color: colorMap.get('red') }}>{message}</span>
    </span>
  );
}
