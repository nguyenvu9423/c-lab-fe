import { normalize } from 'normalizr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchRoles, updateEntity, fetchRole } from '../actions';
import { RoleService } from '../../service/RoleService';
import { roleArraySchema, roleSchema } from '../../entity-schemas';

function* handleFetchRoles(action) {
  const { payload, meta } = action;
  try {
    const { pageable } = payload;
    const { data } = yield call(RoleService.getAllRoles, pageable);
    const { result, entities } = normalize(data.content, roleArraySchema);
    yield put(updateEntity(entities));
    yield put(
      fetchRoles.response({ roles: result, totalPages: data.totalPages }, meta)
    );
  } catch (e) {
    yield put(fetchRoles.response(e, meta));
  }
}

function* handleFetchRole(action) {
  const { payload, meta } = action;
  try {
    const { id } = payload;
    const { data } = yield call(RoleService.getRole, id);
    const { result, entities } = normalize(data, roleSchema);
    yield put(updateEntity(entities));
    yield put(fetchRole.response({ role: result }, meta));
  } catch (e) {
    yield put(fetchRole.response(e, meta));
  }
}

export function* watchRoleSaga() {
  yield takeEvery(fetchRole.request, handleFetchRole);
  yield takeEvery(fetchRoles.request, handleFetchRoles);
}
