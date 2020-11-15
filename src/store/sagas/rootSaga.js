import { call, all } from 'redux-saga/effects';
import { watchUserSaga } from './watchUserSaga';
import { watchArticleSaga } from './watchArticleSaga';
import { watchProblemSaga } from './watchProblemSaga';
import { watchSubmissionLangSaga } from './watchSubmissionLangSaga';
import { watchJudgeConfigSaga } from './watchJudgeConfigSaga';
import { watchSubmissionSaga } from './watchSubmissionSaga';
import { watchSearchSaga } from './watchSearchSaga';
import { watchTagSaga } from './watchTagSaga';

function* rootSaga() {
  yield all([
    call(watchUserSaga),
    call(watchArticleSaga),
    call(watchProblemSaga),
    call(watchSubmissionLangSaga),
    call(watchJudgeConfigSaga),
    call(watchSubmissionSaga),
    call(watchSearchSaga),
    call(watchTagSaga)
  ]);
}

export default rootSaga;
