import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchProblemRejudge, updateEntity } from '../actions';
import { ProblemService } from '../../service/ProblemService';
import { normalize } from 'normalizr';
import { problemRejudgeSchema } from '../../entity-schemas';

function* fetchProblemRejudgeSaga(action) {
  const { payload, meta } = action;
  try {
    const { problemId } = payload;
    const response = yield call(ProblemService.getProblemRejudge, problemId);
    const problemRejudge = response.data;
    const normalizedData = normalize(problemRejudge, problemRejudgeSchema);

    yield put(updateEntity(normalizedData.entities));
    yield put(fetchProblemRejudge.response({ problemRejudge }, meta));
  } catch (e) {
    yield put(fetchProblemRejudge.response(e, meta));
  }
}

export function* watchProblemRejudgeSaga() {
  yield takeEvery(fetchProblemRejudge.request, fetchProblemRejudgeSaga);
}
