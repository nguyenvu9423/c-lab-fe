import { ArticleService } from '../../service/ArticleService';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  articleArraySchema,
  articleSchema
} from '../../entity-schemas/articleSchema';
import { fetchArticle, fetchArticles, updateEntity } from '../actions';
import { normalize } from 'normalizr';

function* fetchArticleSaga(action) {
  try {
    const { articleId } = action.payload;
    const response = yield call(ArticleService.getArticleById, articleId);
    yield put(fetchArticle.response(response));
  } catch (e) {
    yield put(fetchArticle.response(e));
  }
}

function* fetchArticleResponseSaga(action) {
  if (!action.error) {
    const { data: article } = action.payload;
    const entities = normalize(article, articleSchema).entities;
    yield put(updateEntity(entities));
  }
}

function* fetchArticlesSaga(action) {
  try {
    const { page } = action.payload;
    const { data } = yield call(ArticleService.getArticles, page);
    const normalizedData = normalize(data.content, articleArraySchema);
    yield put(
      fetchArticles.response({
        ...data,
        articles: normalizedData.result
      })
    );
    yield put(updateEntity(normalizedData.entities));
  } catch (e) {
    yield put(fetchArticles.response(e));
  }
}

function* watchArticleSaga() {
  yield takeEvery(fetchArticle.request, fetchArticleSaga);
  yield takeEvery(fetchArticle.response, fetchArticleResponseSaga);
  yield takeEvery(fetchArticles.request, fetchArticlesSaga);
}

export { watchArticleSaga };
