import { call, all } from 'redux-saga/effects';
import { watchUserSaga } from './watchUserSaga';
import { watchArticleSaga } from './watchArticleSaga';
import { watchProblemSaga } from './watchProblemSaga';
import { watchCodeLanguageSaga } from './watchCodeLanguageSaga';
import { watchTestPackageSaga } from './watchTestPackageSaga';
import { watchSubmissionSaga } from './watchSubmissionSaga';

function* rootSaga() {
  yield all([
    call(watchUserSaga),
    call(watchArticleSaga),
    call(watchProblemSaga),
    call(watchCodeLanguageSaga),
    call(watchTestPackageSaga),
    call(watchSubmissionSaga)
  ]);
}

export default rootSaga;
