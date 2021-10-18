import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { BufferedInput } from '../../../../components/input';
import { UserSelect } from '../../../../domains/user';
import { FilterUtils } from '../../../../utility/filter/utils';

export namespace UserFilter {
  export interface Props {
    onChange?(query: string): void;
  }

  export interface Value {
    id?: number;
    username?: string;
  }
}

export const UserFilter: React.FC<UserFilter.Props> = (props) => {
  const { onChange } = props;

  const [filters, setFilters] = React.useState<UserFilter.Value>({});

  const handleFitlersChange = React.useCallback(
    (filters) => {
      setFilters(filters);
      let query = '';
      if (filters.id) {
        query = FilterUtils.joinAnd(query, `id==${filters.id}`);
      }
      if (filters.username) {
        query = FilterUtils.joinAnd(query, `username==${filters.username}`);
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
          <UserSelect
            placeholder="Tên đăng nhập"
            onChange={(user) =>
              handleFitlersChange({
                ...filters,
                username: user?.username ?? '',
              })
            }
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
