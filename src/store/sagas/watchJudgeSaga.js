import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchDetailedJudge, updateEntity } from '../actions';
import { JudgeService } from '../../service/JudgeService';
import { normalize } from 'normalizr';
import { judgeSchema } from '../../entity-schemas';

function* fetchDetailedJudgeSaga(action) {
  const { payload, meta } = action;
  try {
    const { submissionId } = payload;
    const { data: detailedJudge } = yield call(
      JudgeService.getDetailedJudgeBySubmission,
      submissionId
    );

    const normalizedData = normalize(detailedJudge, judgeSchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(fetchDetailedJudge.response({ detailedJudge }, meta));
  } catch (error) {
    yield put(fetchDetailedJudge.response(error, meta));
  }
}

export function* watchJudgeSaga() {
  yield takeEvery(fetchDetailedJudge.request, fetchDetailedJudgeSaga);
}
