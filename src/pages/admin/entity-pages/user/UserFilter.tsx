import * as React from 'react';
import { ExpressionNode } from '@rsql/ast';
import { Grid } from 'semantic-ui-react';
import { BufferedInput } from '@/components/input';
import { UserSelect } from '@/domain-ui/user';
import { RsqlUtils } from '@/utils';

export namespace UserFilter {
  export interface Props {
    onChange?(query: string | undefined): void;
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
      const predicates: ExpressionNode[] = [];

      if (filters.id) {
        predicates.push(RsqlUtils.Builder.eq('id', filters.id));
      }
      if (filters.username) {
        predicates.push(RsqlUtils.Builder.eq('username', filters.username));
      }
      const query =
        predicates.length > 0
          ? RsqlUtils.emit(RsqlUtils.Builder.and(...predicates))
          : undefined;
      onChange?.(query);
    },
    [onChange],
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
