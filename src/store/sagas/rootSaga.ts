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
import { watchEmailVerificationSaga } from './watchEmailVerificationSaga';
import { watchContestSaga } from './watchContestSaga';
import { watchUserProblemResultSaga } from './watchUserProblemResultSaga';
import { watchContestSubmissionSaga } from './watchContestSubmissionSaga';
import { watchContestUserResultsSaga } from './watchContestUserResultSaga';
import { watchContestRegistrationSaga } from './watchContestRegistrationSaga';
import { watchContestProblemRejudgeSaga } from './watchContestProblemRejudge';

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
    call(watchEmailVerificationSaga),
    call(watchContestSaga),
    call(watchContestSubmissionSaga),
    call(watchUserProblemResultSaga),
    call(watchContestUserResultsSaga),
    call(watchContestRegistrationSaga),
    call(watchContestProblemRejudgeSaga),
  ]);
}

export default rootSaga;
