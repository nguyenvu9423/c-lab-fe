import { call, all } from 'redux-saga/effects';
import { appStartedSaga } from './appStartedSaga';
import { watchUpdateUserSaga } from './wahtUpdateUserSaga';
import { watchUpdateArticleSaga } from './watchUpdateArticleSaga';

function* rootSaga() {
  yield all([
    call(appStartedSaga),
    call(watchUpdateUserSaga),
    call(watchUpdateArticleSaga)
  ]);
}

export default rootSaga;
