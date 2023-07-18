import * as React from 'react';
import { useSelector } from 'react-redux';
import { Segment, Label, Accordion, Icon, Header } from 'semantic-ui-react';
import { TagSelectors } from '../../store/selectors/TagSelectors';
import { useLocalStorage } from '../../utils';

export namespace TagContainer {
  export interface Props {
    ids: number[];
  }
}

export const TagContainer: React.FC<TagContainer.Props> = (props) => {
  const { ids } = props;
  const tags = useSelector(TagSelectors.selectTagsByIds(ids));
  const [expanded, setExpanded] = useLocalStorage(
    'tag-container-expanded',
    true
  );

  const toggleExpanded = React.useCallback(
    () => setExpanded((value) => !value),
    []
  );

  if (tags.length === 0) {
    return null;
  }

  return (
    <Segment>
      <Accordion>
        <Accordion.Title as={Header} active={expanded} onClick={toggleExpanded}>
          <Icon name="dropdown" />
          Nhãn
        </Accordion.Title>
        {expanded ? (
          <Accordion.Content active={true}>
            <Label.Group tag>
              {tags.map((tag) => (
                <Label key={tag.id}>{tag.name}</Label>
              ))}
            </Label.Group>
          </Accordion.Content>
        ) : undefined}
      </Accordion>
    </Segment>
  );
};
