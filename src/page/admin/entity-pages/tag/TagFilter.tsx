import * as React from 'react';
import { Grid } from 'semantic-ui-react';

import { BufferedInput } from '../../../../components/input';
import { TagNameSelect } from '../../../../domains/tag';
import { ComparisonOperator } from '../../../../utility/filter';
import { FilterUtils } from '../../../../utility/filter/utils';

export namespace TagFilter {
  export interface Props {
    onChange?(value: string): void;
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
      let query = '';
      if (filters.id) {
        query = FilterUtils.joinAnd(
          query,
          `id${ComparisonOperator.EQUAL}${filters.id}`
        );
      }
      if (filters.name) {
        query = FilterUtils.joinAnd(
          query,
          `name${ComparisonOperator.EQUAL}*${filters.name}*`
        );
      }
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
