import {
  fetchProblems,
  fetchProblem,
  fetchProblemById,
  updateProblem,
  updateEntity
} from '../actions';
import { takeEvery, call, put } from 'redux-saga/effects';
import { ProblemService } from '../../service/ProblemService';
import { normalize } from 'normalizr';
import { problemSchema, problemArraySchema } from '../../entitySchema/problem';

function* fetchProblemsSaga() {
  try {
    const { data } = yield call(ProblemService.getProblems);
    const normalizedData = normalize(data.content, problemArraySchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(
      fetchProblems.response({
        ...data,
        problems: normalizedData.result
      })
    );
  } catch (e) {
    yield put(fetchProblems.response(e));
  }
}

function* fetchProblemSaga(action) {
  const params = action.payload;
  try {
    const { data } = yield call(ProblemService.getProblem, params);
    const normalizedData = normalize(data, problemSchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(fetchProblem.response(data));
  } catch (e) {
    yield put(fetchProblem.response(e));
  }
}

function* fetchProblemByIdSaga(action) {
  const { id } = action.payload;
  try {
    const { data } = yield call(ProblemService.getProblemById, id);
    const normalizedData = normalize(data, problemSchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(fetchProblemById.response(data));
  } catch (e) {
    yield put(fetchProblemById.response(e));
  }
}

function* updateProblemSaga(action) {
  const { id, problem } = action.payload;
  try {
    const { data } = yield call(ProblemService.updateProblem(id, problem));
    const normalizedData = normalize(data, problemSchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(updateProblem.response(data));
  } catch (e) {
    yield put(updateProblem.response(e));
  }
}
export function* watchProblemSaga() {
  yield takeEvery(fetchProblems.request, fetchProblemsSaga);
  yield takeEvery(fetchProblem.request, fetchProblemSaga);
  yield takeEvery(fetchProblemById.request, fetchProblemByIdSaga);
  yield takeEvery(updateProblem.request, updateProblemSaga);
}
