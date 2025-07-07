import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import {
  FetchUserContestRegistration,
  fetchUserContestRegistration,
  FetchUserContestRegistrations,
  fetchUserContestRegistrations,
} from '../actions';
import { ContestRegistrationService } from '@/services/contest';
import {
  userContestRegistrationSchema,
  userContestRegistrationsSchema,
} from '@/entity-schemas/user-contest-registration-schemas';

function* fetchUserContestRegistrationsSaga(
  action: PayloadAction<FetchUserContestRegistrations.RequestPayload>,
) {
  const { payload } = action;
  const { target } = payload;
  try {
    let result;
    switch (payload.type) {
      case 'byContest': {
        const { contestId, pageable } = payload;
        result = yield call(
          ContestRegistrationService.getAllByContest,
          contestId,
          pageable,
        );
        break;
      }
      case 'byUserAndContests': {
        const { userId, contestIds, pageable } = payload;
        result = yield call(
          ContestRegistrationService.getAllByUserAndContests,
          userId,
          contestIds,
          pageable,
        );
        break;
      }
    }
    const { data, totalPages } = result;
    const normalizedData = normalize(
      data.content,
      userContestRegistrationsSchema,
    );

    yield put(
      fetchUserContestRegistrations.response({
        result: normalizedData.result,
        entities: normalizedData.entities,
        totalPages,
        target,
      }),
    );
  } catch (error) {
    yield put(fetchUserContestRegistrations.error({ error, target }));
  }
}

function* fetchUserContestRegistrationSaga(
  action: PayloadAction<FetchUserContestRegistration.RequestPayload>,
) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { userId, contestId } = payload;
    const response = yield call(
      ContestRegistrationService.getByUserAndContest,
      userId,
      contestId,
    );
    const { data } = response;

    let result, entities;
    if (!data) {
      result = null;
      entities = {};
    } else {
      const normalizedData = normalize(data, userContestRegistrationSchema);
      result = normalizedData.result;
      entities = normalizedData.entities;
    }

    yield put(
      fetchUserContestRegistration.response({
        result,
        entities,
        target,
      }),
    );
  } catch (error) {
    yield put(fetchUserContestRegistrations.error({ error, target }));
  }
}

function* watchContestRegistrationSaga(): SagaIterator {
  yield takeEvery(
    fetchUserContestRegistrations.request,
    fetchUserContestRegistrationsSaga,
  );

  yield takeEvery(
    fetchUserContestRegistration.request,
    fetchUserContestRegistrationSaga,
  );
}

export { watchContestRegistrationSaga };
