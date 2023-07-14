import React from 'react';
import { Segment } from 'semantic-ui-react';
import { TextFileOverview } from './TextFileOverview';

export const TextFileOverviewContainer: React.FC = React.memo(
  function TextFileOverviewContainer({ children }) {
    return (
      <Segment className="text-file-view-container">
        <TextFileOverview>{children}</TextFileOverview>
      </Segment>
    );
  }
);
