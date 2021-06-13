import { call, all } from 'redux-saga/effects';
import { watchUserSaga } from './watchUserSaga';
import { watchArticleSaga } from './watchArticleSaga';
import { watchProblemSaga } from './watchProblemSaga';
import { watchProblemRejudgeSaga } from './watchProbleRejudgeSaga';
import { watchSubmissionLangSaga } from './watchSubmissionLangSaga';
import { watchJudgeConfigSaga } from './watchJudgeConfigSaga';
import { watchSubmissionSaga } from './watchSubmissionSaga';
import { watchSearchSaga } from './watchSearchSaga';
import { watchTagSaga } from './watchTagSaga';
import { watchAuthenticationSaga } from './watchAuthenticationSaga';
import { watchRoleSaga } from './watchRoleSaga';
import { watchJudgeSaga } from './watchJudgeSaga';
import { watchPrincipalSaga } from './watchPrincipalSaga';

function* rootSaga() {
  yield all([
    call(watchAuthenticationSaga),
    call(watchPrincipalSaga),
    call(watchUserSaga),
    call(watchArticleSaga),
    call(watchProblemSaga),
    call(watchProblemRejudgeSaga),
    call(watchSubmissionLangSaga),
    call(watchJudgeConfigSaga),
    call(watchSubmissionSaga),
    call(watchSearchSaga),
    call(watchTagSaga),
    call(watchRoleSaga),
    call(watchJudgeSaga),
  ]);
}

export default rootSaga;
