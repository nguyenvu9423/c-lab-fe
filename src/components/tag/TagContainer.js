import * as React from 'react';
import { Header, Segment, Label } from 'semantic-ui-react';

export const TagContainer = props => {
  const { problem } = props;
  if (!problem) return null;
  return (
    <>
      <Header as="h3" attached="top">
        Tags
      </Header>
      <Segment attached="bottom">
        <Label.Group tag>
          {problem.tags.map(tag => (
            <Label key={tag.id}>{tag.name}</Label>
          ))}
        </Label.Group>
      </Segment>
    </>
  );
};
