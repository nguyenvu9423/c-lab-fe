import * as React from 'react';
import * as Lodash from 'lodash';
import { ArticleService } from '@/services/ArticleService';
import { SelectConfig } from '@/components/select/SelectConfig';
import { SearchInput } from '@/components/input';
import { ArticleDTO } from '@/services/dtos/ArticleDTO';

export namespace ArticleTitleSelect {
  export interface Props {
    onChange?(value: string): void;
  }
}

export const ArticleTitleSelect: React.FC<ArticleTitleSelect.Props> = (
  props,
) => {
  const { onChange } = props;
  const [articles, setArticles] = React.useState<ArticleDTO[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const load = React.useMemo(
    () =>
      Lodash.debounce((searchQuery) => {
        if (searchQuery) {
          setLoading(true);
          ArticleService.getArticles({
            query: `title=='*${searchQuery}*'`,
          }).then(({ data: { content } }) => {
            setArticles(content);
            setLoading(false);
          });
        }
      }, SelectConfig.DELAY),
    [],
  );

  const articleOptions = React.useMemo(
    () =>
      articles.map((article) => ({
        key: article.id,
        title: article.title,
      })),
    [articles],
  );

  return (
    <SearchInput
      placeholder="Tiêu đề"
      loading={loading}
      options={articleOptions}
      onSubmit={onChange}
      onChange={(value) => {
        load(value);
      }}
    />
  );
};
