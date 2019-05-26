import { call, all } from 'redux-saga/effects';
import { appStartedSaga } from './appStartedSaga';
import { watchUpdateUserSaga } from './fetchUserSaga';

function* rootSaga() {
  yield all([call(appStartedSaga), call(watchUpdateUserSaga)]);
}

export default rootSaga;
