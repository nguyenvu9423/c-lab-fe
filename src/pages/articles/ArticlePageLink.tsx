import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../domains/article';

export namespace ArticlePageLink {
  export interface Props {
    article: number | Article;
  }
}

export const ArticlePageLink: React.FC<ArticlePageLink.Props> = (props) => {
  const { article } = props;

  const url = React.useMemo(
    () =>
      typeof article === 'number'
        ? `articles/${article}`
        : `/articles/${article.id}/view/${article.slug}`,
    [article]
  );

  return <Link to={url}>{props.children}</Link>;
};
