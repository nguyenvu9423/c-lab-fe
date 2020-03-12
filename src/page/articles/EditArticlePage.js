import React from 'react';
import { withRouter } from 'react-router';
import { Container } from 'semantic-ui-react';
import { AddEditArticleForm } from './internal/AddEditArticleForm';
import { ArticleService } from '../../service/ArticleService';
import { connect } from 'react-redux';
import { fetchArticle } from '../../store/actions/article';

class BaseEditArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      fetchArticleById,
      match: {
        params: { id }
      }
    } = this.props;
    fetchArticleById(id);
  }

  handleSubmit(values) {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    ArticleService.updateArticle(id, values)
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
    const { article } = this.props;
    if (!article) return null;
    return (
      <Container>
        <AddEditArticleForm
          initialArticle={article}
          onSubmit={this.handleSubmit}
        />
      </Container>
    );
  }
}

export let EditArticlePage = connect(
  (state, ownProps) => {
    const {
      entities: { article }
    } = state;
    const {
      match: {
        params: { id }
      }
    } = ownProps;
    return { article: article[id] };
  },
  {
    fetchArticleById: fetchArticle.request
  }
)(withRouter(BaseEditArticlePage));
