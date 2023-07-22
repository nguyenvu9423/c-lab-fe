import * as React from 'react';
import * as Lodash from 'lodash';
import { ProblemService } from '@/services/ProblemService';
import { SelectConfig } from '@/components/select/SelectConfig';
import { SearchInput } from '@/components/input';
import { ProblemDTO } from '@/services/dtos/ProblemDTO';

export namespace ProblemCodeSelect {
  export interface Props {
    onChange?(code: string): void;
  }
}
export const ProblemCodeSelect: React.FC<ProblemCodeSelect.Props> = (props) => {
  const { onChange } = props;
  const [value, setValue] = React.useState<string>('');
  const [problems, setProblems] = React.useState<ProblemDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>();

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
    []
  );

  const problemOptions = React.useMemo(
    () =>
      problems.map((problem) => ({
        key: problem.id,
        title: problem.code,
      })),
    [problems]
  );

  return (
    <SearchInput
      placeholder="Mã bài"
      value={value}
      loading={loading}
      options={problemOptions}
      onSubmit={onChange}
      onChange={(searchString) => {
        const value = searchString.toUpperCase();
        setValue(value);
        setProblems([]);
        load(value);
      }}
    />
  );
};
