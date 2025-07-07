import { call, put, takeEvery } from 'redux-saga/effects';
import { FetchContestSubmissions, fetchContestSubmissions } from '../actions';
import { SagaIterator } from 'redux-saga';
import { ContestSubmissionService } from '@/services/ContestSubmissionService';
import { PayloadAction } from '@reduxjs/toolkit';
import { contestSubmissionsSchema } from '@/entity-schemas/contest-submission-schemas';
import { normalize } from 'normalizr';

function* fetchContestSubsSaga(
  action: PayloadAction<FetchContestSubmissions.RequestPayload>,
) {
  const { payload } = action;
  const { target } = payload;
  try {
    const response = yield call(getSubmissions, action.payload);

    const { data } = response;

    const normalizedData = normalize(data.content, contestSubmissionsSchema);
    yield put(
      fetchContestSubmissions.response({
        result: normalizedData.result,
        entities: normalizedData.entities,
        totalPages: data.totalPages,
        target,
      }),
    );
  } catch (error) {
    yield put(fetchContestSubmissions.error({ error, target }));
  }
}

function* getSubmissions(
  payload: FetchContestSubmissions.RequestPayload,
): SagaIterator {
  let response;
  const { pageable, type } = payload;
  switch (type) {
    case 'byUser': {
      const { contestId, username } = payload;
      response = yield call(
        ContestSubmissionService.getSubmissions,
        { contestId, username },
        pageable,
      );
      break;
    }
    case 'byQuery': {
      const { contestId, query } = payload;
      response = yield call(
        ContestSubmissionService.getSubmissions,
        { contestId, query },
        pageable,
      );
      break;
    }
  }

  return response;
}

function* watchContestSubmissionSaga(): SagaIterator {
  yield takeEvery(fetchContestSubmissions.request, fetchContestSubsSaga);
}

export { watchContestSubmissionSaga };
