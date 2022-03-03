import {
  fetchDetailedSub,
  FetchDetailedSub,
  FetchSubmissions,
} from './../actions/submission';
import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchSubmissions } from '../actions';
import { SubmissionService } from '../../service/SubmissionService';
import { normalize } from 'normalizr';
import { submissionsSchema, detailedSubSchema } from '../../entity-schemas';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';

export function* watchSubmissionSaga(): SagaIterator<void> {
  yield takeEvery(fetchSubmissions.request, fetchSubmissionsSaga);
  yield takeEvery(fetchDetailedSub.request, fetchDetailedSubSaga);
}

function* fetchSubmissionsSaga(
  action: PayloadAction<FetchSubmissions.RequestPayload>
) {
  const { target } = action.payload;
  try {
    const response = yield call(getSubmissions, action.payload);

    const { data } = response;
    const { content, totalPages } = data;
    const { result, entities } = normalize(content, submissionsSchema);
    yield put(
      fetchSubmissions.response({
        result,
        entities,
        totalPages,
        target,
      })
    );
  } catch (error) {
    yield put(fetchSubmissions.error({ error, target }));
  }
}

function* fetchDetailedSubSaga(
  action: PayloadAction<FetchDetailedSub.RequestPayload>
) {
  const { submissionId, target } = action.payload;
  try {
    const response = yield call(
      SubmissionService.getSubmission,
      submissionId,
      true
    );
    const { data } = response;
    const { result, entities } = normalize(data, detailedSubSchema);
    yield put(fetchDetailedSub.response({ result, entities, target }));
  } catch (e) {
    yield put(fetchDetailedSub.error({ error: e, target }));
  }
}

function* getSubmissions(
  payload: FetchSubmissions.RequestPayload
): SagaIterator {
  let response;
  const { pageable } = payload;
  switch (payload.type) {
    case 'byQuery':
      response = yield call(
        SubmissionService.getSubmissions,
        { query: payload.query },
        pageable
      );
      break;
    case 'byProblem':
      response = yield call(
        SubmissionService.getSubmissions,
        { problemCode: payload.problemCode },
        pageable
      );
      break;
    case 'byUser':
      response = yield call(
        SubmissionService.getSubmissions,
        {
          username: payload.username,
        },
        pageable
      );
      break;
    case 'byUserAndProblem':
      response = yield call(
        SubmissionService.getSubmissions,
        {
          username: payload.username,
          problemCode: payload.problemCode,
        },
        pageable
      );
      break;
    default:
      throw new Error('Get submissions saga receive unmatched parameters');
  }
  return response;
}
