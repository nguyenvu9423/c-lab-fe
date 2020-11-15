import * as React from 'react';
import * as Lodash from 'lodash';
import { Dropdown } from 'semantic-ui-react';
import { ProblemService } from '../../../service/ProblemService';
import { SelectConfig } from '../../../components/select/SelectConfig';

export function ProblemIdSelect(props) {
  const { onChange, ...restProps } = props;

  const [problems, setProblems] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState(undefined);

  const load = React.useCallback(
    Lodash.debounce(searchQuery => {
      if (searchQuery !== undefined) {
        setIsFetching(true);
        const query = searchQuery ? `id==${searchQuery}` : undefined;
        ProblemService.getProblemsByFilters(query).then(
          ({ data: { content } }) => {
            setProblems(prevProblems => {
              const newProblems = [...prevProblems];
              content.forEach(problem => {
                if (!prevProblems.some(obj => obj.id === problem.id)) {
                  newProblems.push(problem);
                }
              });
              return newProblems;
            });
            setIsFetching(false);
          }
        );
      }
    }, SelectConfig.DELAY),
    []
  );

  React.useEffect(() => load(searchQuery), [searchQuery]);

  const problemOptions = React.useMemo(
    () =>
      problems.map(problem => ({
        key: problem.id,
        value: problem.id,
        text: problem.id
      })),
    [problems]
  );

  return (
    <Dropdown
      search
      selection
      fluid
      clearable
      placeholder="Id"
      selectOnNavigation={false}
      onChange={(event, { value }) => {
        onChange(value);
      }}
      options={problemOptions}
      onSearchChange={(event, { searchQuery }) => {
        setSearchQuery(searchQuery);
      }}
      onOpen={() => {
        if (searchQuery === undefined) {
          setSearchQuery('');
        }
      }}
      loading={isFetching}
      {...restProps}
    />
  );
}
