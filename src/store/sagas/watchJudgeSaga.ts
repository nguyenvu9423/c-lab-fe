import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchDetailedJudge } from '../actions';
import { JudgeService } from '../../service/JudgeService';
import { normalize } from 'normalizr';
import { detailedJudgeSchema } from '../../entity-schemas';
import { SagaIterator } from 'redux-saga';

function* fetchDetailedJudgeSaga(action) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { submissionId } = payload;
    const { data: detailedJudge } = yield call(
      JudgeService.getDetailedJudgeBySubmission,
      submissionId
    );

    const { result, entities } = normalize(detailedJudge, detailedJudgeSchema);
    yield put(fetchDetailedJudge.response({ result, entities, target }));
  } catch (error) {
    yield put(fetchDetailedJudge.error({ error, target }));
  }
}

export function* watchJudgeSaga(): SagaIterator<void> {
  yield takeEvery(fetchDetailedJudge.request, fetchDetailedJudgeSaga);
}
