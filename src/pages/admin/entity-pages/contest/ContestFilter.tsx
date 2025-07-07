import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
import moment from 'moment';
import { BufferedInput, DateRangeInput } from '@/components/input';
import { UserSelect } from '@/domain-ui/user';
import { ExpressionNode } from '@rsql/ast';
import { RsqlUtils } from '@/utils/rsql';

export namespace ContestFilter {
  export interface Props {
    onChange?(value: string | undefined): void;
  }

  export interface Value {
    id: number;
  }
}

export const ContestFilter: React.FC<ContestFilter.Props> = (props) => {
  const [filters, setFilters] = React.useState({
    id: undefined,
    author: undefined,
    duration: {
      from: undefined,
      to: undefined,
    },
    start: {
      from: undefined,
      to: undefined,
    },
  });

  const { onChange } = props;

  const handleFiltersChange = React.useCallback(
    (filters) => {
      setFilters(filters);
      const predicates: ExpressionNode[] = [];

      if (filters.id) {
        predicates.push(RsqlUtils.Builder.eq('id', filters.id));
      }

      if (filters.author) {
        predicates.push(
          RsqlUtils.Builder.eq('author.username', filters.author.username),
        );
      }

      if (filters.duration) {
        const { from, to } = filters.duration;
        if (from) {
          predicates.push(
            RsqlUtils.Builder.ge('duration', filters.duration.from),
          );
        }
        if (to) {
          predicates.push(
            RsqlUtils.Builder.le('duration', filters.duration.to),
          );
        }
      }

      if (filters.start) {
        const { from, to } = filters.start;
        if (from) {
          const fromString = moment(from, 'YYYY-MM-DD').utc().format();
          predicates.push(RsqlUtils.Builder.ge('start', fromString));
        }
        if (to) {
          const toString = moment(to, 'YYYY-MM-DD').endOf('day').utc().format();
          predicates.push(RsqlUtils.Builder.lt('start', toString));
        }
      }

      const query =
        predicates.length > 0
          ? RsqlUtils.emit(RsqlUtils.Builder.and(...predicates))
          : undefined;

      console.log('🚀 ~ query:', query);
      onChange?.(query);
    },
    [onChange],
  );

  return (
    <Grid widths={16} doubling stackable>
      <Grid.Row>
        <Grid.Column>
          <Form error>
            <Form.Group>
              <Form.Field width={2}>
                <BufferedInput
                  type="text"
                  name="id"
                  placeholder="ID"
                  fluid
                  onChange={(value) =>
                    handleFiltersChange({ ...filters, id: value })
                  }
                />
              </Form.Field>
              <Form.Field width={4}>
                <UserSelect
                  placeholder="Người tạo"
                  onChange={(value) =>
                    handleFiltersChange({ ...filters, author: value })
                  }
                />
              </Form.Field>
              <Form.Field inline>
                <label>Bắt đầu</label>
                <DateRangeInput
                  onChange={(value) => {
                    handleFiltersChange({ ...filters, start: value });
                  }}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
