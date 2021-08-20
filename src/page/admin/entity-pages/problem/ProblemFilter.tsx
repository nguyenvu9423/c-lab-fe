import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { BufferedInput } from '../../../../components/input';
import { TagDTO, TagSelect } from '../../../../domains/tag';
import { FilterUtils } from '../../../../utility/filter/utils';
import { ProblemCodeSelect } from './../../../../domains/problem';
import { UserDTO, UserSelect } from './../../../../domains/user';

export namespace ProblemFilter {
  export interface Props {
    onChange?(value: string): void;
  }

  export interface Value {
    id: number;
    code: string;
    author: UserDTO;
    tags: TagDTO[];
  }
}

export const ProblemFilter: React.FC<ProblemFilter.Props> = (props) => {
  const [filters, setFilters] = React.useState({
    id: undefined,
    code: '',
    author: undefined,
    tags: [],
  });

  const { onChange } = props;

  const handleFitlersChange = React.useCallback(
    (filters) => {
      setFilters(filters);
      let query = '';
      if (filters.id) {
        query = FilterUtils.joinAnd(query, `id==${filters.id}`);
      }
      if (filters.code) {
        query = FilterUtils.joinAnd(query, `code==*${filters.code}*`);
      }
      if (filters.author) {
        query = FilterUtils.joinAnd(
          query,
          `author.username==${filters.author.username}`
        );
      }
      if (filters.tags.length > 0) {
        query = FilterUtils.joinAnd(
          query,
          `tags=include=(${filters.tags.map((tag) => tag.name)})`
        );
      }
      onChange?.(query);
    },
    [onChange]
  );

  return (
    <Grid widths={16} doubling stackable>
      <Grid.Row>
        <Grid.Column width={2}>
          <BufferedInput
            type="text"
            name="id"
            placeholder="ID"
            fluid
            onChange={(value) => handleFitlersChange({ ...filters, id: value })}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <ProblemCodeSelect
            onChange={(value) => {
              handleFitlersChange({ ...filters, code: value });
            }}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <UserSelect
            placeholder="Author"
            onChange={(value) =>
              handleFitlersChange({ ...filters, author: value })
            }
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <TagSelect
            onChange={(value) =>
              handleFitlersChange({ ...filters, tags: value })
            }
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
