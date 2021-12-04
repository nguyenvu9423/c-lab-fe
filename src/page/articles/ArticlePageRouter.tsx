import * as React from 'react';
import { match, Route, Switch } from 'react-router';
import { ArticlePage } from './ArticlePage';
import { AddArticlePage } from './AddArticlePage';
import { EditArticlePage } from './EditArticlePage';
import { ArticlesPage } from './ArticlesPage';

const BASE_ARTICLE_URL = '/articles';

export const ArticlePageRouter: React.FC<{ match: match }> = () => {
  return (
    <Switch>
      <Route path={`${BASE_ARTICLE_URL}/add`} component={AddArticlePage} />
      <Route
        exact={true}
        path={`${BASE_ARTICLE_URL}/:id/edit`}
        component={EditArticlePage}
      />
      <Route
        path={`${BASE_ARTICLE_URL}/:id/view/:slug?`}
        component={ArticlePage}
      />
      <Route path={`${BASE_ARTICLE_URL}`} component={ArticlesPage} />
    </Switch>
  );
};
