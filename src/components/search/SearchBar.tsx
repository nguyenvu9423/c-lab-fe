import * as React from 'react';
import * as Lodash from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Search } from 'semantic-ui-react';
import { LoadingState } from '../../store/common';
import { fetchSearch } from '../../store/actions/search';
import { State } from '../../store';
import { SearchResult } from '../../domains/search/SearchResult';

const DEBOUNCE_DURATION = 500;

export interface CategorizedResults {
  [category: string]: {
    name: string;
    results: SearchResult[];
  };
}

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = React.useState('');
  const state = useSelector((state: State) => state.search);

  const results: CategorizedResults | undefined =
    state.loadingState === LoadingState.LOADED
      ? convertToResults(state.results)
      : undefined;

  const query = React.useCallback(
    Lodash.debounce((value) => {
      dispatch(fetchSearch.request(value));
    }, DEBOUNCE_DURATION),
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
      history.push(`/articles/${result.id}/view/${result.slug}`);
    }
  }, []);

  return (
    <Search
      size="small"
      placeholder="Tìm kiếm"
      category
      value={value}
      results={results}
      loading={state.loadingState === LoadingState.LOADING}
      onSearchChange={handleSearchChange}
      onResultSelect={handleResultSelect}
      resultRenderer={resultRenderer}
    />
  );
};

function convertToResults(searchResults: SearchResult[]): CategorizedResults {
  const result: CategorizedResults = {};
  searchResults.forEach((searchResult) => {
    if (!result[searchResult.type]) {
      result[searchResult.type] = { name: searchResult.type, results: [] };
    }
  });

  searchResults.forEach((searchResult) => {
    result[searchResult.type].results.push(searchResult);
  });
  return result;
}

const resultRenderer = (result: SearchResult) => {
  if (result.type === 'problem') {
    return (
      <div className="content">
        <div className="title">{result.code}</div>
        <div className="description">{result.title}</div>
      </div>
    );
  } else {
    return (
      <div className="content">
        <div className="title">{result.title}</div>
        <div className="description">{result.description}</div>
      </div>
    );
  }
};
