import { put, call, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { ArticleService } from '../../service/ArticleService';
import { articleSchema, articleArraySchema } from './../../domains/article';

import { fetchArticle, fetchArticles } from '../actions';
import { SagaIterator } from 'redux-saga';

function* fetchArticleSaga(action) {
  const { id, target } = action.payload;
  try {
    const response = yield call(ArticleService.getArticle, id);
    const article = response.data;
    const normalizedData = normalize(article, articleSchema);
    yield put(
      fetchArticle.response({
        result: normalizedData.result,
        entities: normalizedData.entities,
        target,
      })
    );
  } catch (error) {
    yield put(fetchArticle.error({ error, target }));
  }
}

function* fetchArticlesSaga(action) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { pageable, query } = payload;
    const { data } = yield call(ArticleService.getArticles, {
      pageable,
      query,
    });
    const normalizedData = normalize(data.content, articleArraySchema);
    yield put(
      fetchArticles.response({
        result: normalizedData.result,
        entities: normalizedData.entities,
        totalPages: data.totalPages,
        target,
      })
    );
  } catch (error) {
    yield put(fetchArticles.error({ error, target }));
  }
}

function* watchArticleSaga(): SagaIterator {
  yield takeEvery(fetchArticle.request, fetchArticleSaga);
  yield takeEvery(fetchArticles.request, fetchArticlesSaga);
}

export { watchArticleSaga };
