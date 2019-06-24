import { Grid } from 'semantic-ui-react';
import React from 'react';
import { WriteArticleComponent } from './WriteArticleComponent';
import { withRouter } from 'react-router';
import { ArticleService } from '../../service/ArticleService';

class BaseWriteArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    ArticleService.createArticle(values)
      .then(res => {
        const { data: article } = res;
        const { history } = this.props;
        history.push(`/articles/${article.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Grid container columns={1}>
        <Grid.Column>
          <WriteArticleComponent onSubmit={this.handleSubmit} />
        </Grid.Column>
      </Grid>
    );
  }
}

export const WriteArticlePage = withRouter(BaseWriteArticlePage);
