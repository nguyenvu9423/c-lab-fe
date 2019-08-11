import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ArticleOverviewPage } from './ArticleOverviewPage';
import { ArticleDetailPage } from './ArticleDetailPage';
import { AddArticlePage } from './AddArticlePage';
import { EditArticlePage } from './EditArticlePage';

class ArticlePage extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Switch location={location}>
        <Route path={`${match.path}/add`} component={AddArticlePage} />
        <Route
          exact={true}
          path={`${match.path}/:id/edit`}
          component={EditArticlePage}
        />
        <Route path={`${match.path}/:id`} component={ArticleDetailPage} />
        <Route path={`${match.path}`} component={ArticleOverviewPage} />
      </Switch>
    );
  }
}

export { ArticlePage };
