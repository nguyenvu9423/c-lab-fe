import { fetchTestPackages } from '../actions/testPackage';
import { takeEvery, put, call } from 'redux-saga/effects';
import { TestPackageService } from '../../service/TestPackageService';
import { normalize } from 'normalizr';
import { testPackageDTOArraySchema } from '../../entitySchema/testPackageDTOSchema';
import { updateEntity } from '../actions/entity';

function* fetchTestPackagesSaga(action) {
  const { owningProblemId } = action.payload;
  try {
    const { data } = yield call(
      TestPackageService.getTestPackageList,
      owningProblemId
    );
    const normalizedData = normalize(data, testPackageDTOArraySchema);
    yield put(updateEntity(normalizedData.entities));
    yield put(fetchTestPackages.response(data));
  } catch (err) {
    yield put(fetchTestPackages.response(err));
  }
}

function* watchTestPackageSaga() {
  yield takeEvery(fetchTestPackages.request, fetchTestPackagesSaga);
}

export { watchTestPackageSaga };
