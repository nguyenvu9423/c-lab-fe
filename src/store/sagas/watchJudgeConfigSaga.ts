import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { fetchJudgeConfig, FetchJudgeConfig } from './../actions/judge-config';
import { ProblemService } from '@/services/ProblemService';
import { judgeConfigSchema } from '@/entity-schemas';

function* fetchJudgeConfigSaga(
  action: PayloadAction<FetchJudgeConfig.RequestPayload>
) {
  const { problemCode, target } = action.payload;
  const { data, error } = yield call(
    ProblemService.getJudgeConfig,
    problemCode
  );
  if (data) {
    const normalizedData = normalize(data, judgeConfigSchema);
    yield put(
      fetchJudgeConfig.response({
        result: normalizedData.result,
        entities: normalizedData.entities,
        target,
      })
    );
  } else {
    yield put(fetchJudgeConfig.error({ error, target }));
  }
}

export function* watchJudgeConfigSaga(): SagaIterator {
  yield takeEvery(fetchJudgeConfig.request, fetchJudgeConfigSaga);
}
