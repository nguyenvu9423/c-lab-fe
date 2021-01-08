import * as React from 'react';
import { Segment, Label, Accordion, Icon, Header } from 'semantic-ui-react';

export const TagContainer = props => {
  const { problem } = props;
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Segment>
      <Accordion>
        <Accordion.Title
          as={Header}
          active={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <Icon name="dropdown" />
          Tags
        </Accordion.Title>
        {expanded ? (
          <Accordion.Content active={true}>
            <Label.Group tag>
              {problem.tags.map(tag => (
                <Label key={tag.id}>{tag.name}</Label>
              ))}
            </Label.Group>
          </Accordion.Content>
        ) : (
          undefined
        )}
      </Accordion>
    </Segment>
  );
};
