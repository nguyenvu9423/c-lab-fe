import { createActions } from 'redux-actions';

const { fetchArticle, fetchArticleList, updateArticleEntity } = createActions(
  {
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
  },
  'updateArticleEntity'
);

export { fetchArticle, fetchArticleList, updateArticleEntity };
