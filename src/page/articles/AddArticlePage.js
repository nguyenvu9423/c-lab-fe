import * as React from 'react';
import { AddEditArticleForm } from './internal/AddEditArticleForm';
import { Container } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { ArticleService } from '../../service/ArticleService';

class BaseAddArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { history } = this.props;
    console.log('called');
    ArticleService.createArticle(values)
      .then(res => {
        console.log('called');
        const { data: article } = res;
        history.push(`/articles/${article.id}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <AddEditArticleForm onSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

export let AddArticlePage = withRouter(BaseAddArticlePage);
