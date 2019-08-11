import { createActions } from 'redux-actions';

const { fetchArticle, fetchArticleList } = createActions({
  fetchArticleList: {
    request: undefined,
    response: undefined
  },
  fetchArticle: {
    request: articleId => {
      return { articleId };
    },
    response: undefined
  }
});

export { fetchArticle, fetchArticleList };
