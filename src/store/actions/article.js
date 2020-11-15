import { createActions } from 'redux-actions';
import * as uuid from 'uuid';
import { defaultPayloadCreators } from './shared';

const { fetchArticle, fetchArticles } = createActions({
  fetchArticles: {
    request: [
      defaultPayloadCreators,
      (payload, meta) => ({ ...meta, requestId: uuid.v4() })
    ],
    response: [payload => payload, (payload, meta) => meta]
  },
  fetchArticle: {
    request: [payload => payload, (payload, meta) => meta],
    response: [payload => payload, (payload, meta) => meta]
  }
});

export { fetchArticle, fetchArticles };
