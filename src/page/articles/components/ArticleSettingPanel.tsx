import * as React from 'react';
import { Article } from '../../../domains/article';
import { Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export namespace ArticleSettingPanel {
  export interface Props {
    article: Article;
  }
}

export const ArticleSettingPanel: React.FC<ArticleSettingPanel.Props> = (
  props
) => {
  const { article } = props;
  return (
    <div className="clear-fix-container">
      <Header as="h3" floated="left">
        Cài đặt
      </Header>
      <Button
        floated="right"
        content="Sửa"
        icon="edit"
        as={Link}
        to={`/articles/${article.id}/edit`}
      />
    </div>
  );
};
