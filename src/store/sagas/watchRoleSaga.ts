import { normalize } from 'normalizr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchRoles, fetchRole, FetchRole } from '../actions';
import { RoleService } from '../../services/auth/RoleService';
import { roleArraySchema, roleSchema } from '../../entity-schemas';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleFetchRoles(action) {
  const { payload } = action;
  try {
    const { pageable, target } = payload;
    const { data } = yield call(RoleService.getRoles, pageable);
    const { result, entities } = normalize(data.content, roleArraySchema);
    yield put(
      fetchRoles.response({
        result,
        entities,
        totalPages: data.totalPages,
        target,
      })
    );
  } catch (e) {
    yield put(fetchRoles.error({ error: e }));
  }
}

function* handleFetchRole(action: PayloadAction<FetchRole.RequestPayload>) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { id } = payload;
    const { data } = yield call(RoleService.getRole, id);
    const { result, entities } = normalize(data, roleSchema);
    yield put(fetchRole.response({ result, entities, target }));
  } catch (e) {
    yield put(fetchRole.error({ error: e, target }));
  }
}

export function* watchRoleSaga(): SagaIterator {
  yield takeEvery(fetchRole.request, handleFetchRole);
  yield takeEvery(fetchRoles.request, handleFetchRoles);
}
