import { call, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { watchUserSaga } from './watchUserSaga';
import { watchArticleSaga } from './watchArticleSaga';
import { watchProblemSaga } from './watchProblemSaga';
import { watchProblemRejudgeSaga } from './watchProblemRejudgeSaga';
import { watchSubmissionSaga } from './watchSubmissionSaga';
import { watchSearchSaga } from './watchSearchSaga';
import { watchTagSaga } from './watchTagSaga';
import { watchAuthenticationSaga } from './watchAuthenticationSaga';
import { watchRoleSaga } from './watchRoleSaga';
import { watchJudgeSaga } from './watchJudgeSaga';
import { watchPrincipalSaga } from './watchPrincipalSaga';
import { watchJudgeConfigSaga } from './watchJudgeConfigSaga';

function* rootSaga(): SagaIterator {
  yield all([
    call(watchAuthenticationSaga),
    call(watchPrincipalSaga),
    call(watchUserSaga),
    call(watchArticleSaga),
    call(watchProblemSaga),
    call(watchProblemRejudgeSaga),
    call(watchSubmissionSaga),
    call(watchSearchSaga),
    call(watchTagSaga),
    call(watchRoleSaga),
    call(watchJudgeSaga),
    call(watchJudgeConfigSaga),
  ]);
}

export default rootSaga;
