import * as React from 'react';
import { Icon, Loader } from 'semantic-ui-react';

export const InProgressLabel: React.FC<{ message: string }> = (props) => {
  const { message } = props;
  return (
    <span className="status-label loading">
      <Loader size="mini" inline active />
      <span>{message}</span>
    </span>
  );
};

export const AcceptedLabel: React.FC<{ message?: string }> = (props) => {
  const { message } = props;
  return (
    <span className="status-label accepted">
      <Icon name="checkmark" />
      {message && <span>{message}</span>}
    </span>
  );
};

export const ScoreLabel: React.FC<{
  score: number;
  style?: React.CSSProperties;
}> = (props) => {
  const { score, style } = props;
  return (
    <span className="status-label score">
      <span style={style}>
        {score.toString().indexOf('.') === -1
          ? score.toString()
          : score.toFixed(2)}
      </span>
    </span>
  );
};

export const ErrorLabel: React.FC<{ message: string }> = (props) => {
  const { message } = props;
  return (
    <span className="status-label error">
      <span>{message}</span>
    </span>
  );
};
