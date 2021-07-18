import { fetchDetailedSub, FetchDetailedSub } from './../actions/submission';
import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchSubmissions } from '../actions';
import { SubmissionService } from '../../service/SubmissionService';
import { normalize } from 'normalizr';
import { submissionsSchema, detailedSubSchema } from '../../entity-schemas';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';

function* fetchSubmissionsSaga(action) {
  const { userId, problemId, query, pageable, target } = action.payload;
  try {
    const response = yield call(
      SubmissionService.getSubmissions,
      {
        userId,
        problemId,
        query,
      },
      pageable
    );
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
  } catch (e) {
    //@ts-ignore
    yield put(fetchSubmissions.response(e, action.meta));
  }
}

function* fetchDetailedSubSaga(
  action: PayloadAction<FetchDetailedSub.RequestPayload>
) {
  const { submissionId, target } = action.payload;
  try {
    const response = yield call(
      SubmissionService.getDetailedSubmissionById,
      submissionId
    );
    const { data } = response;
    const { result, entities } = normalize(data, detailedSubSchema);
    yield put(fetchDetailedSub.response({ result, entities, target }));
  } catch (e) {
    yield put(fetchDetailedSub.error({ error: e, target }));
  }
}

function* watchSubmissionSaga(): SagaIterator<void> {
  yield takeEvery(fetchSubmissions.request, fetchSubmissionsSaga);
  yield takeEvery(fetchDetailedSub.request, fetchDetailedSubSaga);
}

export { watchSubmissionSaga };
