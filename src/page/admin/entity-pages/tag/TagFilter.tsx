import * as React from 'react';
import { ExpressionNode } from '@rsql/ast';
import { Grid } from 'semantic-ui-react';

import { BufferedInput } from '../../../../components/input';
import { TagNameSelect } from '../../../../domains/tag';
import { RsqlUtils } from '../../../../utility';

export namespace TagFilter {
  export interface Props {
    onChange?(value: string | undefined): void;
  }

  export interface Value {
    id?: number;
    name?: string;
  }
}

export const TagFilter: React.FC<TagFilter.Props> = (props) => {
  const { onChange } = props;
  const [filters, setFilters] = React.useState<TagFilter.Value>({});

  const handleChange = React.useCallback(
    (filters) => {
      setFilters(filters);
      const predicates: ExpressionNode[] = [];
      if (filters.id) {
        predicates.push(RsqlUtils.Builder.eq('id', filters.id));
      }
      if (filters.name) {
        predicates.push(RsqlUtils.Builder.eq('name', `*${filters.name}*`));
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
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <BufferedInput
            type="text"
            name="id"
            placeholder="ID"
            fluid
            onChange={(value) => {
              handleChange({ ...filters, id: value });
            }}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <TagNameSelect
            onChange={(value) => {
              handleChange({ ...filters, name: value });
            }}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
