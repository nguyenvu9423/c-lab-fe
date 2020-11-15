import { fetchJudgeConfigs } from '../actions/judgeConfig';
import { takeEvery, put, call } from 'redux-saga/effects';
import { JudgeConfigService } from '../../service/JudgeConfigService';
import { normalize } from 'normalizr';
import { judgeConfigArraySchema } from '../../entity-schemas/judgeConfigSchema';
import { updateEntity } from '../actions/entity';

function* fetchJudgeConfigsSaga(action) {
  const { payload, meta } = action;

  try {
    const { problemId, pageable } = payload;
    const { data } = yield call(
      JudgeConfigService.getJudgeConfigs,
      { problemId },
      pageable
    );
    const normalizedData = normalize(data.content, judgeConfigArraySchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(
      fetchJudgeConfigs.response(
        {
          judgeConfigs: normalizedData.result,
          totalPages: data.totalPages,
          pageNumber: data.number
        },
        meta
      )
    );
  } catch (err) {
    yield put(fetchJudgeConfigs.response(err, meta));
  }
}

function* watchJudgeConfigSaga() {
  yield takeEvery(fetchJudgeConfigs.request, fetchJudgeConfigsSaga);
}

export { watchJudgeConfigSaga };
