import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchContest, FetchContests, fetchContests } from '../actions';
import { ContestService } from '@/services';
import {
  contestArraySchema,
  contestSchema,
} from '@/entity-schemas/contest-schema';
import { normalize } from 'normalizr';
import { PayloadAction } from '@reduxjs/toolkit';

function* fetchContestSaga(action) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { id } = payload;
    const { data } = yield call(ContestService.getContest, id);

    const normalizedData = normalize(data, contestSchema);
    yield put(
      fetchContest.response({
        result: normalizedData.result,
        entities: normalizedData.entities,
        target,
      }),
    );
  } catch (error) {
    yield put(fetchContests.error({ error, target }));
  }
}

function* fetchContestsSaga(
  action: PayloadAction<FetchContests.RequestPayload>,
) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { pageable, sort, query } = payload;
    const { data } = yield call(ContestService.getContests, {
      pageable,
      query,
      sort,
    });
    const normalizedData = normalize(data.content, contestArraySchema);
    yield put(
      fetchContests.response({
        result: normalizedData.result,
        entities: normalizedData.entities,
        totalPages: data.totalPages,
        target,
      }),
    );
  } catch (error) {
    yield put(fetchContests.error({ error, target }));
  }
}

function* watchContestSaga(): SagaIterator {
  yield takeEvery(fetchContests.request, fetchContestsSaga);
  yield takeEvery(fetchContest.request, fetchContestSaga);
}

export { watchContestSaga };
