import * as React from 'react';
import { TagService } from '../../service/TagService';
import { Dropdown } from 'semantic-ui-react';
import { SelectConfig } from '../../components/select';
import { OnlyNameTag } from './Tag';

export const useFetchTagBySearch = (props: {
  initialTags: OnlyNameTag[];
}): {
  tags: OnlyNameTag[];
  isFetching: boolean;
  handleSearch: (search: string) => void;
} => {
  const { initialTags } = props;

  const [isFetching, setIsFetching] = React.useState(false);
  const [tags, setTags] = React.useState<OnlyNameTag[]>(initialTags ?? []);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  const load = React.useCallback((searchQuery) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsFetching(true);
      TagService.getTagsByContainedText(searchQuery)
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
    tags,
    isFetching,
    handleSearch: load,
  };
};

export interface TagSelectProps {
  value?: OnlyNameTag[];
  onChange: (tags: OnlyNameTag[]) => void;
  onBlur?: any;
}

export const TagSelect: React.FC<TagSelectProps> = (props) => {
  const { onChange, onBlur } = props;

  const [internalValue, setInternalValue] = React.useState(props.value);

  const value = React.useMemo(
    () => props.value ?? internalValue ?? [],
    [props.value, internalValue]
  );

  const { isFetching, tags, handleSearch } = useFetchTagBySearch({
    initialTags: value,
  });

  return (
    <Dropdown
      selection
      multiple
      search
      fluid
      value={value.map((tag) => tag.name)}
      placeholder="Nhãn"
      loading={isFetching}
      options={tags.map((tag) => ({ text: tag.name, value: tag.name }))}
      onSearchChange={(event, { searchQuery }) => {
        handleSearch(searchQuery);
      }}
      onChange={(event, data) => {
        const newTags = (data?.value as string[]).map((tagName) => {
          const tag = tags.find((tag) => tag.name === tagName);
          if (!tag) throw new Error();
          return tag;
        });
        if (!props.value) setInternalValue(newTags);
        onChange?.(newTags);
      }}
      onOpen={() => {
        handleSearch('');
      }}
      onBlur={onBlur}
    />
  );
};
