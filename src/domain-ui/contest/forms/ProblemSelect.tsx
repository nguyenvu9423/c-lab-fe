import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import Lodash from 'lodash';

import { Problem } from '@/domains/problem';
import { ProblemService } from '@/services/ProblemService';
import { SelectConfig } from '@/components/select';
import { ProblemDTO } from '@/services/dtos';

export namespace ProblemSelect {
  export interface Props {
    initialQuery?: string;
    onChange: (problem: Problem) => void;
  }
}

export const ProblemSelect: React.FC<ProblemSelect.Props> = (props) => {
  const { initialQuery, onChange } = props;
  const [problems, setProblems] = React.useState<ProblemDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>();
  const [searchQuery, setSearchQuery] = useState(initialQuery ?? '');

  const load = React.useMemo(
    () =>
      Lodash.debounce((searchQuery) => {
        if (searchQuery) {
          setLoading(true);
          ProblemService.getProblems({ query: `code==*${searchQuery}*` })
            .then(({ data: { content } }) => {
              setProblems(content);
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
            });
        }
      }, SelectConfig.DELAY),
    [],
  );

  useEffect(() => load(searchQuery), [load, searchQuery]);

  const problemOptions = React.useMemo(
    () =>
      problems.map((problem) => ({
        key: problem.id,
        value: problem.id,
        text: problem.code,
      })),
    [problems],
  );

  return (
    <Dropdown
      options={problemOptions}
      searchQuery={searchQuery}
      onSearchChange={(_event, data) => {
        const searchQuery = data.searchQuery.toUpperCase();
        setSearchQuery(searchQuery);
      }}
      onChange={(_event, data) => {
        const problem = problems.find((problem) => problem.id === data.value);
        if (!problem) return;

        setSearchQuery(problem.code);
        onChange(problem as unknown as Problem);
      }}
      loading={loading}
      search
      selection
      fluid
      placeholder="Chọn bài"
    />
  );
};
