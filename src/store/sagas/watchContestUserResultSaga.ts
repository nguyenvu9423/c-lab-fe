import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { FetchContestUserResults, fetchContestUserResults } from '../actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { ContestResultService } from '@/services/contest';
import { contestUserResultsSchema } from '@/entity-schemas/contest-user-result-schemas';
import { normalize } from 'normalizr';

function* fetchResults(
  action: PayloadAction<FetchContestUserResults.RequestPayload>,
) {
  const { payload } = action;
  const { contestId, pageable, target } = payload;
  try {
    const { data } = yield call(ContestResultService.getUserResults, {
      contestId,
      pageable,
    });
    const normalizedData = normalize(data.content, contestUserResultsSchema);

    yield put(
      fetchContestUserResults.response({
        result: normalizedData.result,
        entities: normalizedData.entities,
        totalPages: data.totalPages,
        target,
      }),
    );
  } catch (error) {
    yield put(fetchContestUserResults.error({ error, target }));
  }
}

export function* watchContestUserResultsSaga(): SagaIterator {
  yield takeEvery(fetchContestUserResults.request, fetchResults);
}
