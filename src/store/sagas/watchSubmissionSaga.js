import { takeEvery, call, put } from 'redux-saga/effects';
import {
  updateEntity,
  fetchDetailedSubmission,
  fetchSubmissions,
  fetchDetailedResult
} from '../actions';
import { SubmissionService } from '../../service/SubmissionService';
import { normalize } from 'normalizr';
import {
  submissionsSchema,
  detailedSubmissionSchema
} from '../../entity-schemas';

function* fetchSubmissionsSaga(action) {
  const { userId, problemId, query, pageable } = action.payload;
  try {
    const response = yield call(
      SubmissionService.getSubmissions,
      {
        userId,
        problemId,
        query
      },
      pageable
    );
    const { data } = response;
    const { content, number: activePage, totalPages } = data;
    const normalizedData = normalize(content, submissionsSchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(
      fetchSubmissions.response(
        {
          submissions: normalizedData.result,
          totalPages,
          activePage
        },
        action.meta
      )
    );
  } catch (e) {
    yield put(fetchSubmissions.response(e, action.meta));
  }
}

function* fetchDetailedResultSaga(action) {
  const { meta, payload } = action;
  const { submissionId } = payload;
  try {
    const response = yield call(
      SubmissionService.getDetailedResult,
      submissionId
    );
    const { data } = response;
    yield put(fetchDetailedResult.response({ detailedResult: data }, meta));
  } catch (e) {
    yield put(fetchDetailedResult.response(e, meta));
  }
}

function* fetchDetailedSubmissionSaga(action) {
  const { submissionId } = action.payload;
  const meta = action.meta;
  try {
    const response = yield call(
      SubmissionService.getDetailedSubmissionById,
      submissionId
    );
    const { data: detailedSubmission } = response;
    const { entities } = normalize(
      detailedSubmission,
      detailedSubmissionSchema
    );
    yield put(updateEntity(entities));
    yield put(fetchDetailedSubmission.response({ detailedSubmission }, meta));
  } catch (e) {
    yield put(fetchDetailedSubmission.response(e, meta));
  }
}

function* watchSubmissionSaga() {
  yield takeEvery(fetchSubmissions.request, fetchSubmissionsSaga);
  yield takeEvery(fetchDetailedResult.request, fetchDetailedResultSaga);
  yield takeEvery(fetchDetailedSubmission.request, fetchDetailedSubmissionSaga);
}

export { watchSubmissionSaga };
