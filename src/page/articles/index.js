import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { ArticlePage } from './ArticlePage';
import { AddArticlePage } from './AddArticlePage';
import { EditArticlePage } from './EditArticlePage';
import { ArticlesPage } from './ArticlesPage';

class BaseArticlePage extends React.Component {
  render() {
    const { match } = this.props;
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
  }
}

export const ArticlePageRouter = withRouter(BaseArticlePage);
