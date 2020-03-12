import * as React from 'react';
import { colorMap } from '../../../utility/ColorMap';
import { Loader } from 'semantic-ui-react';

function SubmissionLoadingStatusLabel(props) {
  const { message } = props;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        color: colorMap.get('lightGrey')
      }}
    >
      <div
        style={{
          display: 'inline-block',
          width: 24,
          height: 24,
          marginRight: 7
        }}
      >
        <Loader size="mini" inline active />
      </div>

      {message}
    </div>
  );
}

export default SubmissionLoadingStatusLabel;
