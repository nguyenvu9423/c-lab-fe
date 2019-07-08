import { call, all } from 'redux-saga/effects';
import { watchUserSaga } from './watchUserSaga';
import { watchArticleSaga } from './watchArticleSaga';

function* rootSaga() {
  yield all([call(watchUserSaga), call(watchArticleSaga)]);
}

export default rootSaga;
