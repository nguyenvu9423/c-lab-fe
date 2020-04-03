import {
  fetchProblems,
  fetchProblem,
  fetchProblemById,
  updateProblem,
  updateEntity,
  fetchProblemByCode
} from '../actions';
import { takeEvery, call, put } from 'redux-saga/effects';
import { ProblemService } from '../../service/ProblemService';
import { normalize } from 'normalizr';
import {
  problemSchema,
  problemArraySchema
} from '../../entity-schemas/problem';

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
  const {
    payload: { params },
    meta
  } = action;
  try {
    let response;
    if (params.id) {
      response = yield call(ProblemService.getProblem, params.id);
    } else {
      response = yield call(ProblemService.getProblemByParams, params);
    }
    const problem = response.data;
    const normalizedData = normalize(problem, problemSchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(fetchProblem.response({ problem }, meta));
  } catch (e) {    
    yield put(fetchProblem.response(e, meta));
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
  yield takeEvery(fetchProblem.request, fetchProblemSaga);
  yield takeEvery(fetchProblemByCode.request, fetchProblemSaga);
  yield takeEvery(fetchProblemById.request, fetchProblemSaga);

  yield takeEvery(fetchProblems.request, fetchProblemsSaga);
  yield takeEvery(updateProblem.request, updateProblemSaga);
}
