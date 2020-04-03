import * as React from 'react';
import { TagService } from '../../service/TagService';

export function useTagSelect(initialTags = []) {
  const [isFetchingTags, setIsFetchingTags] = React.useState(false);
  const tagFetchingTimeoutRef = React.useRef();
  const [tagOptions, setTagOptions] = React.useState(
    initialTags.map(tag => ({
      text: tag.name,
      value: tag.name,
      fieldvalue: tag
    }))
  );

  const mapTagToValue = React.useCallback(tag => tag.name, []);
  const mapValueToTag = React.useCallback(
    value => {
      const option = tagOptions.find(option => option.value === value);
      if (option) {
        return option.fieldvalue;
      } else {
        return { name: value };
      }
    },
    [tagOptions]
  );
  const handleTagSearchChange = React.useCallback(searchQuery => {
    if (!searchQuery) return;
    if (tagFetchingTimeoutRef.current) {
      clearTimeout(tagFetchingTimeoutRef.current);
    }
    tagFetchingTimeoutRef.current = setTimeout(() => {
      setIsFetchingTags(true);
      TagService.getTagByContainedText(searchQuery)
        .then(({ data: { content } }) => {
          setTagOptions(prevTagOptions => {
            const tags = content.filter(item =>
              prevTagOptions.every(option => option.value !== item.name)
            );
            return [
              ...prevTagOptions,
              ...tags.map(tag => ({
                text: tag.name,
                value: tag.name,
                fieldvalue: tag
              }))
            ];
          });
          setIsFetchingTags(false);
        })
        .catch(() => {
          setIsFetchingTags(false);
        });
    }, 500);
  }, []);

  const handleAddOption = React.useCallback(value => {
    setTagOptions(prevTagOptions => [
      ...prevTagOptions,
      { text: value, value, fieldvalue: { name: value } }
    ]);
  }, []);

  return {
    tagOptions,
    setTagOptions,
    mapTagToValue,
    mapValueToTag,
    isFetchingTags,
    handleTagSearchChange,
    handleAddOption
  };
}
