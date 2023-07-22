import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchTag, fetchTags, FetchTags, FetchTag } from '../actions';
import { normalize } from 'normalizr';
import { SagaIterator } from 'redux-saga';

import { TagService } from '@/services';
import { tagArraySchema, tagSchema } from '@/entity-schemas';

function* fetchTagsSaga(action: PayloadAction<FetchTags.RequestPayload>) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { pageable, query } = payload;
    const { data } = yield call(TagService.getTags, pageable, query);
    const { result, entities } = normalize(data.content, tagArraySchema);
    yield put(
      fetchTags.response({
        result,
        entities,
        totalPages: data.totalPages,
        target,
      })
    );
  } catch (e) {
    yield put(fetchTags.error({ error: e, target }));
  }
}

function* fetchTagSaga(action: PayloadAction<FetchTag.RequestPayload>) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { id } = payload;
    const { data } = yield call(TagService.getTagById, id);
    const { result, entities } = normalize(data, tagSchema);
    yield put(
      fetchTag.response({
        result,
        entities,
        target,
      })
    );
  } catch (e) {
    yield put(fetchTag.error({ error: e, target }));
  }
}

export function* watchTagSaga(): SagaIterator {
  yield takeEvery(fetchTags.request, fetchTagsSaga);
  yield takeEvery(fetchTag.request, fetchTagSaga);
}
