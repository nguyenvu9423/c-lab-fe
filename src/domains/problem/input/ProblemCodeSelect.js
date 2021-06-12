import * as React from 'react';
import * as Lodash from 'lodash';
import { Search } from 'semantic-ui-react';
import { ProblemService } from '../../../service/ProblemService';
import { SelectConfig } from '../../../components/select/SelectConfig';
import { useSearchInput } from '../../../components/input';

export function ProblemCodeSelect(props) {
  const { onChange } = props;
  const [problems, setProblems] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState();

  const load = React.useCallback(
    Lodash.debounce(searchQuery => {
      if (searchQuery) {
        setIsFetching(true);
        ProblemService.getProblemByQuery(`code==*${searchQuery}*`).then(
          ({ data: { content } }) => {
            setProblems(content);
            setIsFetching(false);
          }
        );
      }
    }, SelectConfig.DELAY),
    []
  );

  const problemOptions = React.useMemo(
    () =>
      problems.map(problem => ({
        key: problem.id,
        title: problem.code
      })),
    [problems]
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
      setProblems([]);
      load(value);
    }
  });

  return (
    <Search
      className="normal-input"
      fluid
      placeholder="Code"
      loading={isFetching}
      value={value}
      onSearchChange={(event, data) => {
        handleSearchChange(event, { ...data, value: data.value.toUpperCase() });
      }}
      results={problemOptions}
      onResultSelect={handleResultSelect}
      open={openDropdown}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
}
