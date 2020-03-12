import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
  fetchSubmissionsByUserAndProblem,
  fetchSubmissionsByProblem
} from '../actions/submission';
import { SubmissionService } from '../../service/SubmissionService';
import { normalize } from 'normalizr';
import { submissionListSchema } from '../../entity-schemas/submissionSchema';
import { updateEntity } from '../actions/entity';
import { submissionDetailsSchema } from '../../entity-schemas/submissionDetailSchema';
import { requestModal, showModal } from '../actions/modal';
import { ModalMap } from '../../components/modals';

function* fetchSubmissionsByUserAndProblemSaga(action) {
  const { userId, problemId, pageable } = action.payload;
  try {
    const response = yield call(
      SubmissionService.getSubmissionsByUserAndProblem,
      userId,
      problemId,
      pageable
    );
    const { data } = response;
    const { content, number: activePage, totalPages } = data;
    const normalizedData = normalize(content, submissionListSchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(
      fetchSubmissionsByUserAndProblem.response({
        submissions: normalizedData.result,
        totalPages,
        activePage
      })
    );
  } catch (e) {
    yield put(fetchSubmissionsByUserAndProblem.response(e));
  }
}

function* fetchSubmissionsByProblemSaga(action) {
  const { problemId, pageable } = action.payload;
  try {
    const response = yield call(
      SubmissionService.getSubmissionsByProblem,
      problemId,
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

function* handleDetailsModalRequest(action) {
  const { modalType, submissionId } = action.payload;
  try {
    const response = yield call(
      SubmissionService.getSubmissionDetailsById,
      submissionId
    );
    const { data } = response;
    const normalizedData = normalize(data, submissionDetailsSchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(
      requestModal.response({ modalType, modalProps: { submissionId } })
    );
  } catch (e) {
    yield put(requestModal.response(e));
  }
}

function* watchSubmissionSaga() {
  yield takeEvery(
    fetchSubmissionsByUserAndProblem.request,
    fetchSubmissionsByUserAndProblemSaga
  );
  yield takeEvery(
    fetchSubmissionsByProblem.request,
    fetchSubmissionsByProblemSaga
  );
  yield takeLatest(
    action =>
      action.type == requestModal.request &&
      action.payload.modalType === ModalMap.SUBMISSION_DETAILS.type,
    handleDetailsModalRequest
  );
}

export { watchSubmissionSaga };
