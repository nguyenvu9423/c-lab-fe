import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchAllSubmissionLangs, updateEntity } from '../actions';
import { SubmissionLangService } from '../../service/SubmissionLangService';
import { normalize } from 'normalizr';
import { submissionLangArraySchema } from '../../entity-schemas/submissionLangSchema';

function* fetchAllSaga() {
  try {
    const { data } = yield call(SubmissionLangService.getAll);
    const normalizedData = normalize(data, submissionLangArraySchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(fetchAllSubmissionLangs.response(data));
  } catch (e) {
    yield put(fetchAllSubmissionLangs.response(e));
  }
}

export function* watchSubmissionLangSaga() {
  yield takeEvery(fetchAllSubmissionLangs.request, fetchAllSaga);
}
