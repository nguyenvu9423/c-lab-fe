import { call, all } from 'redux-saga/effects';
import { watchUserSaga } from './watchUserSaga';
import { watchArticleSaga } from './watchArticleSaga';
import { watchProblemSaga } from './watchProblemSaga';
import { watchSubmissionLangSaga } from './watchSubmissionLangSaga';
import { watchTestPackageSaga } from './watchTestPackageSaga';
import { watchSubmissionSaga } from './watchSubmissionSaga';
import { watchSearchSaga } from './watchSearchSaga';

function* rootSaga() {
  yield all([
    call(watchUserSaga),
    call(watchArticleSaga),
    call(watchProblemSaga),
    call(watchSubmissionLangSaga),
    call(watchTestPackageSaga),
    call(watchSubmissionSaga),
    call(watchSearchSaga)
  ]);
}

export default rootSaga;
