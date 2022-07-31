import * as React from 'react';
import { Grid } from 'semantic-ui-react';
import { BufferedInput } from '../../../../components/input';
import { ArticleTitleSelect } from '../../../../domains/article/input/ArticleTitleSelect';
import { OnlyNameTag, TagSelect } from '../../../../domains/tag';
import { UserDTO } from '../../../../domains/user';
import { UserSelect } from '../../../../domains/user/UserSelect';
import { ComparisonOperator } from '../../../../utility/filter';
import { FilterUtils } from '../../../../utility/filter/utils';

export namespace ArticleFilter {
  export interface Props {
    onChange?(query: string): void;
  }

  export interface Value {
    id?: string;
    title?: string;
    author?: UserDTO;
    tags?: OnlyNameTag[];
  }
}

export const ArticleFilter: React.FC<ArticleFilter.Props> = (props) => {
  const { onChange } = props;
  const [filters, setFilters] = React.useState<ArticleFilter.Value>({});

  const handleFilterChange = React.useCallback(
    (filters: ArticleFilter.Value) => {
      setFilters(filters);
      let query = '';
      if (filters.id) {
        query = FilterUtils.joinAnd(
          query,
          `id${ComparisonOperator.EQUAL}${filters.id}`
        );
      }
      if (filters.title) {
        query = FilterUtils.joinAnd(
          query,
          `title${ComparisonOperator.EQUAL}'*${filters.title}*'`
        );
      }
      if (filters.author) {
        query = FilterUtils.joinAnd(
          query,
          `author.username${ComparisonOperator.EQUAL}${filters.author.username}`
        );
      }
      if (filters.tags && filters.tags.length) {
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
    <Grid columns={4} doubling>
      <Grid.Row>
        <Grid.Column width={2}>
          <BufferedInput
            type="text"
            name="id"
            placeholder="ID"
            fluid
            onChange={(value) => handleFilterChange({ ...filters, id: value })}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <ArticleTitleSelect
            onChange={(value) =>
              handleFilterChange({ ...filters, title: value })
            }
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <UserSelect
            placeholder="Người tạo"
            onChange={(value) =>
              handleFilterChange({ ...filters, author: value })
            }
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <TagSelect
            onChange={(value) =>
              handleFilterChange({ ...filters, tags: value })
            }
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
