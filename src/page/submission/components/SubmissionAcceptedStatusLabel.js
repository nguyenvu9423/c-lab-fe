import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import { colorMap } from '../../../utility/ColorMap';

function SubmissionAcceptedStatusLabel(props) {
  const { message } = props;
  return (
    <div>
      <Icon name="checkmark" style={{ marginRight: 14 }} color="green" />
      <span style={{ color: colorMap.get('green') }}>{message}</span>
    </div>
  );
}

export default SubmissionAcceptedStatusLabel;
