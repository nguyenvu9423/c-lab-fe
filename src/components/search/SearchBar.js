import * as React from 'react';
import * as Lodash from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Search } from 'semantic-ui-react';
import { SearchSelectors } from '../../store/selectors/SearchSelectors';
import { LoadingState } from '../../store/common';
import { search } from '../../store/actions/search';

export function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = React.useState('');
  const { results, loadingState } = useSelector(SearchSelectors.state());

  const categorizedResults = results.reduce((current, item) => {
    if (!current[item.type]) {
      current[item.type] = { name: item.type, results: [] };
    }
    const typeMap = current[item.type];
    typeMap.results.push({
      ...item,
      key: item.id
    });
    return current;
  }, {});

  const query = React.useCallback(
    Lodash.debounce(value => {
      dispatch(search.request(value));
    }, 500),
    []
  );

  const handleSearchChange = React.useCallback((event, { value }) => {
    setValue(value);
    if (value) query(value);
  }, []);

  const handleResultSelect = React.useCallback((event, { result }) => {
    setValue('');
    if (result.type === 'problem') {
      history.push(`/problems/${result.code}`);
    } else if (result.type === 'article') {
      history.push(`/articles/${result.id}`);
    }
  });

  return (
    <Search
      size="small"
      category
      value={value}
      results={categorizedResults}
      loading={loadingState === LoadingState.LOADING}
      onSearchChange={handleSearchChange}
      onResultSelect={handleResultSelect}
      resultRenderer={resultRenderer}
    />
  );
}

const resultRenderer = props => {
  if (props.type === 'problem') {
    return (
      <div className="content">
        <div className="title">{props.code}</div>
        <div className="description">{props.title}</div>
      </div>
    );
  } else if (props.type === 'article') {
    return (
      <div className="content">
        <div className="title">{props.title}</div>
        <div className="description">{props.description}</div>
      </div>
    );
  }
  return null;
};
