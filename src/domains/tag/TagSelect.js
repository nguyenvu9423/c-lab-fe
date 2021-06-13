import * as React from 'react';
import { TagService } from '../../service/TagService';
import { Dropdown } from 'semantic-ui-react';
import { SelectConfig } from '../../components/select';

const tagOptionMapper = (tag) => ({ text: tag.name, value: tag.name });

export function useTagSelect(props = {}) {
  const { initialTags } = props;
  const [isFetching, setIsFetching] = React.useState(false);
  const [tags, setTags] = React.useState(initialTags ?? []);
  const timeoutRef = React.useRef();
  const options = React.useMemo(() => tags.map(tagOptionMapper), [tags]);

  const mapTagToValue = React.useCallback((tag) => tag.name, []);
  const mapValueToTag = React.useCallback(
    (value) => tags.find((tag) => tag.name === value),
    [tags]
  );

  const load = React.useCallback((searchQuery) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsFetching(true);
      TagService.getTagByContainedText(searchQuery)
        .then(({ data: { content } }) => {
          setTags((prevTags) => {
            const newTags = content.filter((prevTag) =>
              prevTags.every((tag) => tag.name !== prevTag.name)
            );
            return [...prevTags, ...newTags];
          });
          setIsFetching(false);
        })
        .catch(() => {
          setIsFetching(false);
        });
    }, SelectConfig.DELAY);
  }, []);

  return {
    options,
    mapTagToValue,
    mapValueToTag,
    isFetching,
    handleSearchChange: load,
  };
}

export function TagSelect(props) {
  const { initialValue, onChange } = props;

  const [internalValue, setInternalValue] = React.useState(
    props.value ? undefined : initialValue ?? []
  );

  const value = React.useMemo(
    () => props.value ?? internalValue,
    [props.value, internalValue]
  );

  const {
    isFetching,
    options,
    mapTagToValue,
    mapValueToTag,
    handleSearchChange,
  } = useTagSelect({ initialTags: props.value ?? initialValue });

  return (
    <Dropdown
      selection
      multiple
      search
      fluid
      value={value.map(mapTagToValue)}
      placeholder="Tags"
      loading={isFetching}
      options={options}
      onSearchChange={(event, { searchQuery }) => {
        handleSearchChange(searchQuery);
      }}
      onChange={(event, data) => {
        const tags = data.value.map(mapValueToTag);
        if (!props.value) setInternalValue(tags);
        onChange?.(tags);
      }}
      onOpen={() => {
        handleSearchChange('');
      }}
    />
  );
}
