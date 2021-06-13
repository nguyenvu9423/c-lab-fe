import { fetchProblems, fetchProblem, updateEntity } from '../actions';
import { takeEvery, call, put } from 'redux-saga/effects';
import { ProblemService } from '../../service/ProblemService';
import { normalize } from 'normalizr';
import {
  problemSchema,
  problemArraySchema,
} from '../../entity-schemas/problem';

function* fetchProblemsSaga(action) {
  const { payload, meta } = action;
  try {
    const { pageable, query } = payload;
    const { data } = yield call(ProblemService.getProblems, {
      query,
      pageable,
    });
    const normalizedData = normalize(data.content, problemArraySchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(
      fetchProblems.response(
        {
          problems: normalizedData.result,
          totalPages: data.totalPages,
        },
        meta
      )
    );
  } catch (e) {
    yield put(fetchProblems.response(e, meta));
  }
}

function* fetchProblemSaga(action) {
  const { payload, meta } = action;
  try {
    const { id, ...params } = payload;
    let response;
    if (id) {
      response = yield call(ProblemService.getProblem, id);
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

export function* watchProblemSaga() {
  yield takeEvery(fetchProblem.request, fetchProblemSaga);
  yield takeEvery(fetchProblems.request, fetchProblemsSaga);
}
