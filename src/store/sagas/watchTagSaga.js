import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchTags, updateEntity } from '../actions';
import { TagService } from '../../service/TagService';
import { normalize } from 'normalizr';
import { tagArraySchema } from '../../entity-schemas';

function* fetchTagsSaga(action) {
  const { payload, meta } = action;
  try {
    const { pageable, query } = payload;
    const { data } = yield call(TagService.getTags, pageable, query);
    const { result, entities } = normalize(data.content, tagArraySchema);
    yield put(updateEntity(entities));
    yield put(
      fetchTags.response(
        {
          tags: result,
          totalPages: data.totalPages,
        },
        meta
      )
    );
  } catch (e) {
    yield put(fetchTags.response(e, meta));
  }
}

export function* watchTagSaga() {
  yield takeEvery(fetchTags.request, fetchTagsSaga);
}
