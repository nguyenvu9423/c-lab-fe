import { fetchJudgeConfig } from '../actions/judgeConfig';
import { takeEvery, put, call } from 'redux-saga/effects';
import { JudgeConfigService } from '../../service/JudgeConfigService';
import { normalize } from 'normalizr';
import { updateEntity } from '../actions/entity';
import { judgeConfigSchema } from '../../entity-schemas/judgeConfigSchema';

function* fetchJudgeConfigSaga(action) {
  const { payload, meta } = action;

  try {
    const { problemId } = payload;
    const { data } = yield call(JudgeConfigService.getJudgeConfig, {
      problemId
    });
    let judgeConfig;
    if (data === '') {
      judgeConfig = null;
    } else {
      const normalizedData = normalize(data, judgeConfigSchema);
      yield put(updateEntity(normalizedData.entities));
      judgeConfig = normalizedData.result;
    }

    yield put(fetchJudgeConfig.response({ judgeConfig }, meta));
  } catch (err) {
    yield put(fetchJudgeConfig.response(err, meta));
  }
}

function* watchJudgeConfigSaga() {
  yield takeEvery(fetchJudgeConfig.request, fetchJudgeConfigSaga);
}

export { watchJudgeConfigSaga };
