import { ArticleService } from '../service/ArticleService';
import { take, put, call, takeEvery } from 'redux-saga/effects';
import { articleSchema } from '../entitySchema/articleSchema';
import { updateArticleEntity } from '../action/article';
import { fetchArticle } from '../action/article';
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
    yield put(updateArticleEntity(entities.article));
  }
}

function* watchArticleSaga() {
  yield takeEvery(fetchArticle.request, fetchArticleSaga);
  yield takeEvery(fetchArticle.response, fetchArticleResponseSaga);
}

export { watchArticleSaga };
