import { takeEvery, call, put } from 'redux-saga/effects';
import {
  fetchSubmissionsByProblem,
  updateEntity,
  fetchSubmissionResultLog,
  fetchDetailedSubmissionById,
  fetchSubmissions
} from '../actions';
import { SubmissionService } from '../../service/SubmissionService';
import { normalize } from 'normalizr';
import { submissionListSchema } from '../../entity-schemas/submissionSchema';
import { detailedSubmissionSchema } from '../../entity-schemas/detailedSubmissionSchema';

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
    const normalizedData = normalize(content, submissionListSchema);
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

function* fetchSubmissionsByProblemSaga(action) {
  const { problemId, filters, pageable } = action.payload;
  try {
    const response = yield call(
      SubmissionService.getSubmissionsByProblem,
      problemId,
      filters,
      pageable
    );
    const { data } = response;
    const { content, number: activePage, totalPages } = data;
    const normalizedData = normalize(content, submissionListSchema);
    yield put(updateEntity(normalizedData.entities));

    yield put(
      fetchSubmissionsByProblem.response({
        submissions: normalizedData.result,
        totalPages,
        activePage
      })
    );
  } catch (e) {
    yield put(fetchSubmissionsByProblem.response(e));
  }
}

function* fetchSubmissionResultLogSaga(action) {
  const { submissionId } = action.payload;
  try {
    const response = yield call(
      SubmissionService.getSubmissionResultLogById,
      submissionId
    );
    const { data } = response;
    yield put(fetchSubmissionResultLog.response(data));
  } catch (e) {
    yield put(fetchSubmissionResultLog.response(e));
  }
}

function* fetchDetailedSubmissionByIdSaga(action) {
  const { submissionId } = action.payload;
  try {
    const response = yield call(
      SubmissionService.getDetailedSubmissionById,
      submissionId
    );
    const { data } = response;
    const { entities, result } = normalize(data, detailedSubmissionSchema);
    yield put(updateEntity(entities));
    yield put(
      fetchDetailedSubmissionById.response({
        submissionId: result.submission,
        code: result.code,
        detailedResult: result.detailedResult
      })
    );
  } catch (e) {
    yield put(fetchDetailedSubmissionById.response(e));
  }
}

function* watchSubmissionSaga() {
  yield takeEvery(fetchSubmissions.request, fetchSubmissionsSaga);

  yield takeEvery(
    fetchSubmissionsByProblem.request,
    fetchSubmissionsByProblemSaga
  );
  yield takeEvery(
    fetchSubmissionResultLog.request,
    fetchSubmissionResultLogSaga
  );
  yield takeEvery(
    fetchDetailedSubmissionById.request,
    fetchDetailedSubmissionByIdSaga
  );
}

export { watchSubmissionSaga };
