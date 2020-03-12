import { createActions } from 'redux-actions';

const { fetchArticle, fetchArticles } = createActions({
  fetchArticles: {
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

export { fetchArticle, fetchArticles };
