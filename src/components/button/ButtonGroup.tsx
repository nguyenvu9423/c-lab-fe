import * as React from 'react';

export const ButtonGroup: React.FC<{ children?: React.ReactNode }> = (
  props,
) => {
  return <div className="button-group">{props.children}</div>;
};
