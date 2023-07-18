import {
  fetchProblems,
  fetchProblem,
  FetchProblems,
  FetchProblem,
  fetchDetailedProblem,
  FetchDetailedProblem,
} from '../actions';
import { takeEvery, call, put } from 'redux-saga/effects';
import { ProblemService } from '../../services/ProblemService';
import { normalize } from 'normalizr';
import {
  problemSchema,
  problemArraySchema,
  detailedProblemSchema,
} from '../../domains/problem';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchProblemsSaga(
  action: PayloadAction<FetchProblems.RequestPayload>
) {
  const { payload } = action;
  const { pageable, query, requestId, target } = payload;
  try {
    const { data } = yield call(ProblemService.getProblems, {
      query,
      pageable,
    });
    const { result, entities } = normalize(data.content, problemArraySchema);
    yield put(
      fetchProblems.response({
        result,
        entities,
        totalPages: data.totalPages,
        requestId,
        target,
      })
    );
  } catch (e) {
    yield put(
      fetchProblems.error({
        error: e,
        requestId,
        target,
      })
    );
  }
}

function* fetchDetailedProblemSaga(
  action: PayloadAction<FetchDetailedProblem.RequestPayload>
) {
  const { payload } = action;
  const { target } = payload;
  try {
    let response;
    if (payload.type === 'byCode') {
      response = yield call(ProblemService.getProblem, payload.code, true);
    }
    const problem = response.data;
    const { result, entities } = normalize(problem, detailedProblemSchema);
    yield put(fetchDetailedProblem.response({ result, entities, target }));
  } catch (e) {
    yield put(fetchDetailedProblem.error({ error: e, target }));
  }
}

function* fetchProblemSaga(action: PayloadAction<FetchProblem.RequestPayload>) {
  const { payload } = action;
  const { target } = payload;
  try {
    let response;
    if (payload.type === 'byCode') {
      response = yield call(ProblemService.getProblem, payload.code);
    }
    const problem = response.data;
    const { result, entities } = normalize(problem, problemSchema);
    yield put(fetchProblem.response({ result, entities, target }));
  } catch (e) {
    yield put(fetchProblem.error({ error: e, target }));
  }
}

export function* watchProblemSaga(): SagaIterator<void> {
  yield takeEvery(fetchProblem.request, fetchProblemSaga);
  yield takeEvery(fetchProblems.request, fetchProblemsSaga);
  yield takeEvery(fetchDetailedProblem.request, fetchDetailedProblemSaga);
}
