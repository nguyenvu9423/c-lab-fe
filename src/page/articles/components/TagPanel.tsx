import React from 'react';
import { useSelector } from 'react-redux';
import { Label } from 'semantic-ui-react';
import { TagSelectors } from '../../../store/selectors/TagSelectors';

export const TagPanel: React.FC<{ tagIds: number[] }> = (props) => {
  const { tagIds } = props;
  const tags = useSelector(TagSelectors.selectByIds(tagIds));
  return (
    <Label.Group tag>
      {tags.map((tag) => (
        <Label key={tag.id}>{tag.name}</Label>
      ))}
    </Label.Group>
  );
};
