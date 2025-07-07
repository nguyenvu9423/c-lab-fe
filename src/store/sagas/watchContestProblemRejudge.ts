import { PayloadAction } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { SagaIterator } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';
import {
  fetchContestProblemRejudge,
  FetchContestProblemRejudge,
} from '../actions/contest/contest-problem-rejudge';
import { ContestRejudgeService } from '@/services/contest/ContestRejudgeService';
import { contestProblemRejudgeSchema } from '@/entity-schemas/contest-problem-rejudge-schemas';

function* fetchContestProblemRejudgeSaga(
  action: PayloadAction<FetchContestProblemRejudge.RequestPayload>,
) {
  const { payload } = action;
  const { target } = payload;

  try {
    let response;
    if (payload.type === 'latest') {
      const { contestId, problemId } = payload;
      response = yield call(ContestRejudgeService.getLatest, {
        contestId,
        problemId,
      });
    }

    if (!response.data) {
      yield put(
        fetchContestProblemRejudge.response({
          result: null,
          entities: {},
          target,
        }),
      );
      return;
    }

    const { result, entities } = normalize(
      response.data,
      contestProblemRejudgeSchema,
    );

    yield put(
      fetchContestProblemRejudge.response({ result, entities, target }),
    );
  } catch (e) {
    yield put(fetchContestProblemRejudge.error({ error: e }));
  }
}

export function* watchContestProblemRejudgeSaga(): SagaIterator {
  yield takeEvery(
    fetchContestProblemRejudge.request,
    fetchContestProblemRejudgeSaga,
  );
}
