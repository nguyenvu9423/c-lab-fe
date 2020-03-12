import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchAllCodeLanguages, updateEntity } from '../actions';
import { CodeLanguageService } from '../../service/CodeLanguageService';
import { normalize } from 'normalizr';
import { codeLanguageArraySchema } from '../../entitySchema/codeLanguageSchema';

function* fetchAllSaga() {
  try {
    const { data } = yield call(CodeLanguageService.getAll);
    const normalizedData = normalize(data, codeLanguageArraySchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(fetchAllCodeLanguages.response(data));
  } catch (e) {
    yield put(fetchAllCodeLanguages.response(e));
  }
}

export function* watchCodeLanguageSaga() {
  yield takeEvery(fetchAllCodeLanguages.request, fetchAllSaga);
}
