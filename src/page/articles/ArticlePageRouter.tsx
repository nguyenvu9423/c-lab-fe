import * as React from 'react';
import { match, Route, Switch } from 'react-router';
import { ArticlePage } from './ArticlePage';
import { AddArticlePage } from './AddArticlePage';
import { EditArticlePage } from './EditArticlePage';
import { ArticlesPage } from './ArticlesPage';

export const ArticlePageRouter: React.FC<{ match: match }> = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route path={`${match.path}/add`} component={AddArticlePage} />
      <Route
        exact={true}
        path={`${match.path}/:id/edit`}
        component={EditArticlePage}
      />
      <Route path={`${match.path}/:id`} component={ArticlePage} />
      <Route path={`${match.path}`} component={ArticlesPage} />
    </Switch>
  );
};
