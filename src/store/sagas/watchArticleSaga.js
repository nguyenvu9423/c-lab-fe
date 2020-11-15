import { put, call, takeEvery } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { ArticleService } from '../../service/ArticleService';
import {
  articleArraySchema,
  articleSchema
} from '../../entity-schemas/articleSchema';
import { fetchArticle, fetchArticles, updateEntity } from '../actions';

function* fetchArticleSaga(action) {
  try {
    const { id } = action.payload;
    let response;
    if (id) {
      response = yield call(ArticleService.getArticle, id);
    }
    const article = response.data;
    const normalizedData = normalize(article, articleSchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(fetchArticle.response({ article }, action.meta));
  } catch (e) {
    yield put(fetchArticle.response(e, action.meta));
  }
}

function* fetchArticlesSaga(action) {
  try {
    const { pageable, query } = action.payload;
    const { data } = yield call(ArticleService.getArticles, {
      pageable,
      query
    });
    const normalizedData = normalize(data.content, articleArraySchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(
      fetchArticles.response(
        {
          articles: normalizedData.result,
          totalPages: data.totalPages
        },
        action.meta
      )
    );
  } catch (e) {
    yield put(fetchArticles.response(e));
  }
}

function* watchArticleSaga() {
  yield takeEvery(fetchArticle.request, fetchArticleSaga);
  yield takeEvery(fetchArticles.request, fetchArticlesSaga);
}

export { watchArticleSaga };
