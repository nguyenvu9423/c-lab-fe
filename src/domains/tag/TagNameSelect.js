import * as React from 'react';
import * as Lodash from 'lodash';
import { Search } from 'semantic-ui-react';
import { TagService } from '../../service/TagService';
import { SelectConfig } from '../../components/select/SelectConfig';
import { useSearchInput } from '../../components/input';

export function TagNameSelect(props) {
  const { onChange } = props;

  const [tags, setTags] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState();

  const load = React.useCallback(
    Lodash.debounce((searchQuery) => {
      if (searchQuery) {
        setIsFetching(true);
        TagService.getTags(
          { page: 0, size: 10 },
          `name==*${searchQuery}*`
        ).then(({ data: { content } }) => {
          setTags(content);
          setIsFetching(false);
        });
      }
    }, SelectConfig.DELAY),
    []
  );

  const tagOptions = React.useMemo(
    () =>
      tags.map((tag) => ({
        key: tag.id,
        title: tag.name,
      })),
    [tags]
  );

  const {
    value,
    openDropdown,
    handleSearchChange,
    handleResultSelect,
    handleKeyDown,
    handleBlur,
  } = useSearchInput({
    onChange,
    onSearchChange: (value) => {
      setTags([]);
      load(value);
    },
  });

  return (
    <Search
      className="normal-input"
      fluid
      placeholder="Name"
      loading={isFetching}
      value={value}
      onSearchChange={handleSearchChange}
      results={tagOptions}
      onResultSelect={handleResultSelect}
      open={openDropdown}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
}
