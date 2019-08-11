import { ArticleService } from '../service/ArticleService';
import { take, put, call, takeEvery } from 'redux-saga/effects';
import {
  articleListSchema,
  articleSchema
} from '../entitySchema/articleSchema';
import { fetchArticle, fetchArticleList } from '../action/article';
import { normalize } from 'normalizr';
import { updateEntity } from '../action/entity';

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

function* fetchArticleListSaga(action) {
  try {
    const { data } = yield call(ArticleService.getArticleList);
    const normalizedData = normalize(data.content, articleListSchema);
    yield put(
      fetchArticleList.response({ articleList: normalizedData.result })
    );
    yield put(updateEntity(normalizedData.entities));
  } catch (e) {
    yield put(fetchArticleList.response(e));
  }
}

function* watchArticleSaga() {
  yield takeEvery(fetchArticle.request, fetchArticleSaga);
  yield takeEvery(fetchArticle.response, fetchArticleResponseSaga);
  yield takeEvery(fetchArticleList.request, fetchArticleListSaga);
}

export { watchArticleSaga };
