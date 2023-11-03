import * as React from 'react';
import * as Lodash from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from 'semantic-ui-react';
import { LoadingState } from '../../store/common';
import { fetchSearch } from '../../store/actions/search';
import { State } from '../../store';
import { SearchResult } from '@/domains/search/SearchResult';
import { useNavigate } from 'react-router';
import { MarkdownView } from '../editors';

const DEBOUNCE_DURATION = 500;

export interface CategorizedResults {
  [category: string]: {
    name: string;
    results: SearchResult[];
  };
}

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = React.useState('');
  const state = useSelector((state: State) => state.search);

  const results: CategorizedResults | undefined =
    state.loadingState === LoadingState.LOADED
      ? convertToResults(state.results)
      : undefined;

  const query = React.useMemo(
    () =>
      Lodash.debounce((value) => {
        dispatch(fetchSearch.request(value));
      }, DEBOUNCE_DURATION),
    [dispatch],
  );

  const clear = React.useCallback(
    () => dispatch(fetchSearch.clear()),
    [dispatch],
  );

  const handleSearchChange = React.useCallback(
    (event, { value }) => {
      setValue(value);
      if (value) {
        query(value);
      } else {
        clear();
      }
    },
    [query, clear],
  );

  const handleResultSelect = React.useCallback(
    (event, { result }) => {
      setValue('');
      clear();
      if (result.type === 'problem') {
        navigate(`/problems/${result.code}`);
      } else if (result.type === 'article') {
        navigate(`/articles/${result.id}/view/${result.slug}`);
      }
    },
    [clear, navigate],
  );

  return (
    <Search
      placeholder="Tìm kiếm"
      fluid
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
  if (result.type === 'PROBLEM') {
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
        <div className="description">
          <MarkdownView>{result.description}</MarkdownView>
        </div>
      </div>
    );
  }
};
