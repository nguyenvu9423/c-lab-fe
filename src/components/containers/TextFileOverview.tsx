import * as React from 'react';

export const TextFileOverview: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  return <div className="text-file-view">{children}</div>;
};
