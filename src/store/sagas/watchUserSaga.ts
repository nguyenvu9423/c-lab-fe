import { PayloadAction } from '@reduxjs/toolkit';
import { call, takeEvery, put, select } from 'redux-saga/effects';
import { fetchUser, fetchUsers, FetchUsers, FetchUser } from '../actions';
import { UserService } from '../../service/UserService';
import { userSchema, usersSchema } from '../../entity-schemas/userSchema';
import { normalize } from 'normalizr';
import { SagaIterator } from 'redux-saga';
import { AuthenticationSelectors } from '../selectors';

function* fetchUsersSaga(action: PayloadAction<FetchUsers.RequestPayload>) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { pageable, query } = payload;
    const { data } = yield call(UserService.getAll, pageable, query);
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
      response = yield call(UserService.getById, payload.id);
    } else if (payload.type === 'byUsername') {
      response = yield call(UserService.getByUsername, payload.username);
    } else if (payload.type === 'principal') {
      const username: string | undefined = yield select(
        AuthenticationSelectors.username()
      );
      if (!username) {
        throw new Error('User is not logged in');
      }
      response = yield call(UserService.getByUsername, username);
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
