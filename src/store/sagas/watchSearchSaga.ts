import { fetchSearch } from './../actions/search';
import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, call, put } from 'redux-saga/effects';
import { FetchSearch } from '../actions/search';
import { SearchService } from '../../services/SearchService';
import { SagaIterator } from 'redux-saga';

function* fetchSearchSaga(action: PayloadAction<FetchSearch.RequestPayload>) {
  const { target, requestId } = action.payload;
  try {
    const { searchString } = action.payload;
    const { data } = yield call(SearchService.search, searchString);
    const results = data.content;
    yield put(fetchSearch.response({ results, target, requestId }));
  } catch (error) {
    yield put(fetchSearch.error({ error, target, requestId }));
  }
}

export function* watchSearchSaga(): SagaIterator<void> {
  yield takeLatest(fetchSearch.request, fetchSearchSaga);
}
