import * as React from 'react';
import { colorMap } from '../../utility/ColorMap';
import { Loader, Icon } from 'semantic-ui-react';

export const InProgressLabel: React.FC<{ message: string }> = (props) => {
  const { message } = props;
  return (
    <span className="status-label loading">
      <Loader size="tiny" inline active style={{ margin: 8 }} />
      <span>{message}</span>
    </span>
  );
};

export const AcceptedLabel: React.FC<{ message: string }> = (props) => {
  const { message } = props;
  return (
    <span>
      <Icon name="checkmark" style={{ margin: 8 }} color="green" />
      <span style={{ color: colorMap.get('green') }}>{message}</span>
    </span>
  );
};

export const ScoreLabel: React.FC<{
  score: number;
  style?: Record<string, any>;
}> = (props) => {
  const { score, style } = props;
  return (
    <span>
      <span style={{ color: colorMap.get('green'), ...style }}>{score}</span>
    </span>
  );
};

export const ErrorLabel: React.FC<{ message: string }> = (props) => {
  const { message } = props;
  return (
    <span>
      <Icon style={{ margin: 8 }} name="warning sign" color="red" />
      <span style={{ color: colorMap.get('red') }}>{message}</span>
    </span>
  );
};
