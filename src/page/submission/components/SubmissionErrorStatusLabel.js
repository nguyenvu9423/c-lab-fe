import * as React from 'react';
import { Icon } from 'semantic-ui-react';
import { colorMap } from '../../../utility/ColorMap';

function SubmissionErrorStatusLabel(props) {
  const { message } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          display: 'inline-block',
          width: 24,
          height: 24,
          marginRight: 7
        }}
      >
        <Icon
          style={{ verticalAlign: 'middle' }}
          name="warning sign"
          color="red"
        />
      </div>

      <span style={{ color: colorMap.get('red') }}>{message}</span>
    </div>
  );
}

export default SubmissionErrorStatusLabel;
