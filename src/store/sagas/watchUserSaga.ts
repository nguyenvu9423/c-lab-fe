import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeEvery, put } from 'redux-saga/effects';
import { fetchUser, fetchUsers, FetchUsers, FetchUser } from '../actions';
import { UserService } from '../../service/UserService';
import { userSchema, usersSchema } from '../../entity-schemas/userSchema';
import { normalize } from 'normalizr';
import { SagaIterator } from 'redux-saga';

function* fetchUsersSaga(action: PayloadAction<FetchUsers.RequestPayload>) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { pageable } = payload;
    const { data } = yield call(UserService.getUsers, pageable);
    const { result, entities } = normalize(data.content, usersSchema);
    yield put(
      fetchUsers.response({
        result,
        entities,
        totalPages: data.totalPages,
        target,
      })
    );
  } catch (e) {
    yield put(fetchUsers.error({ error: e, target }));
  }
}

function* fetchUserSaga(action: PayloadAction<FetchUser.RequestPayload>) {
  const { payload } = action;
  const { target } = payload;
  try {
    let response;
    if (payload.type === 'byId') {
      response = yield call(UserService.getUserById, payload.id);
    } else if (payload.type === 'byUsername') {
      response = yield call(UserService.getUserByUsername, payload.username);
    } else if (payload.type === 'principal') {
      response = yield call(UserService.getLoginUser);
    }

    const { result, entities } = normalize(response.data, userSchema);

    yield put(fetchUser.response({ result, entities, target }));
  } catch (e) {
    yield put(fetchUser.error({ error: e, target }));
  }
}

export function* watchUserSaga(): SagaIterator {
  yield takeEvery(fetchUser.request, fetchUserSaga);
  yield takeEvery(fetchUsers.request, fetchUsersSaga);
}
