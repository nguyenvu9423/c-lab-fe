import {
  fetchTestPackagesByOwningProblem,
  fetchTestPackages
} from '../actions/testPackage';
import { takeEvery, put, call } from 'redux-saga/effects';
import { TestPackageService } from '../../service/TestPackageService';
import { normalize } from 'normalizr';
import { testPackageDTOArraySchema } from '../../entity-schemas/testPackageDTOSchema';
import { updateEntity } from '../actions/entity';

function* fetchTestPackagesSaga(action) {
  const { problemId, pageable } = action.payload;
  try {
    const { data } = yield call(
      TestPackageService.getTestPackagesByOwningProblem,
      problemId,
      pageable
    );
    const normalizedData = normalize(data.content, testPackageDTOArraySchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(
      fetchTestPackages.response({
        testPackages: normalizedData.result,
        totalPages: data.totalPages,
        pageNumber: data.number
      })
    );
  } catch (err) {
    yield put(fetchTestPackages.response(err));
  }
}

function* watchTestPackageSaga() {
  yield takeEvery(
    fetchTestPackagesByOwningProblem.request,
    fetchTestPackagesSaga
  );
}

export { watchTestPackageSaga };
