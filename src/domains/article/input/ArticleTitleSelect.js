import * as React from 'react';
import * as Lodash from 'lodash';
import { Search } from 'semantic-ui-react';
import { ArticleService } from '../../../service/ArticleService';
import { SelectConfig } from '../../../components/select/SelectConfig';
import { useSearchInput } from '../../../components/input';

export function ArticleTitleSelect(props) {
  const { onChange } = props;
  const [articles, setArticles] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState();

  const load = React.useCallback(
    Lodash.debounce(searchQuery => {
      if (searchQuery) {
        setIsFetching(true);
        ArticleService.getArticles({ query: `title=='*${searchQuery}*'` }).then(
          ({ data: { content } }) => {
            setArticles(content);
            setIsFetching(false);
          }
        );
      }
    }, SelectConfig.DELAY),
    []
  );

  const articleOptions = React.useMemo(
    () =>
      articles.map(problem => ({
        key: problem.id,
        title: problem.title
      })),
    [articles]
  );

  const {
    value,
    openDropdown,
    handleSearchChange,
    handleResultSelect,
    handleKeyDown,
    handleBlur
  } = useSearchInput({
    onChange,
    onSearchChange: value => {
      setArticles([]);
      load(value);
    }
  });

  return (
    <Search
      className="normal-input"
      fluid
      placeholder="Title"
      loading={isFetching}
      value={value}
      onSearchChange={handleSearchChange}
      results={articleOptions}
      onResultSelect={handleResultSelect}
      open={openDropdown}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
}
