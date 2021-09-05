import { PayloadAction } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { SagaIterator } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';
import { fetchProblemRejudge, FetchProblemRejudge } from '../actions';
import { ProblemService } from '../../service/ProblemService';
import { problemRejudgeSchema } from '../../entity-schemas';

function* fetchProblemRejudgeSaga(
  action: PayloadAction<FetchProblemRejudge.RequestPayload>
) {
  const { payload } = action;
  const { target } = payload;

  try {
    let response;
    if (payload.type === 'byCode') {
      response = yield call(
        ProblemService.getProblemRejudge,
        payload.problemCode
      );
    }

    const { result, entities } = normalize(response.data, problemRejudgeSchema);

    yield put(fetchProblemRejudge.response({ result, entities, target }));
  } catch (e) {
    yield put(fetchProblemRejudge.error({ error: e }));
  }
}

export function* watchProblemRejudgeSaga(): SagaIterator {
  yield takeEvery(fetchProblemRejudge.request, fetchProblemRejudgeSaga);
}
