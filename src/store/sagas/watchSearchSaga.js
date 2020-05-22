import { takeLatest, call, put } from 'redux-saga/effects';
import { search } from '../actions/search';
import { SearchService } from '../../service/SearchService';

function* searchSaga(action) {
  try {
    const { searchString } = action.payload;
    const { data } = yield call(SearchService.search, searchString);
    const results = data.content;
    yield put(search.response({ results }));
  } catch (e) {
    yield put(search.response(e));
  }
}

export function* watchSearchSaga() {
  yield takeLatest(search.request, searchSaga);
}
