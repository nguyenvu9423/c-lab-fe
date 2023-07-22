import * as React from 'react';
import { ExpressionNode } from '@rsql/ast';
import { Grid } from 'semantic-ui-react';

import { TagSelect } from '@/domain-ui/tag';
import { ProblemCodeSelect } from '@/domain-ui//problem';
import { UserSelect } from '@/domain-ui/user';
import { UserDTO, TagDTO } from '@/services/dtos';
import { BufferedInput } from '@/components/input';
import { RsqlUtils } from '@/utils';

export namespace ProblemFilter {
  export interface Props {
    onChange?(value: string | undefined): void;
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
      const predicates: ExpressionNode[] = [];

      if (filters.id) {
        predicates.push(RsqlUtils.Builder.eq('id', filters.id));
      }
      if (filters.code) {
        predicates.push(RsqlUtils.Builder.eq('code', `*${filters.code}*`));
      }
      if (filters.author) {
        predicates.push(
          RsqlUtils.Builder.eq('author.username', filters.author.username)
        );
      }
      if (filters.tags.length > 0) {
        predicates.push(
          RsqlUtils.Builder.comparison(
            'tags',
            '=include=',
            filters.tags.map((tag) => tag.name)
          )
        );
      }
      const query =
        predicates.length > 0
          ? RsqlUtils.emit(RsqlUtils.Builder.and(...predicates))
          : undefined;

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
            placeholder="Người tạo"
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
