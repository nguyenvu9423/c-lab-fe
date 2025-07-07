import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchUserProblemResults } from '../actions';
import { normalize } from 'normalizr';
import { UserProblemResultService } from '@/services/submission/UserProblemResultService';
import { userProblemResultsSchema } from '@/entity-schemas/user-problem-result-schemas';

function* fetchResults(action) {
  const { payload } = action;
  const { target } = payload;
  try {
    const { userIds, problemIds } = payload;
    const { data } = yield call(
      UserProblemResultService.getResultsByUsernamesAndProblems,
      userIds,
      problemIds,
    );
    const normalizedData = normalize(data, userProblemResultsSchema);
    yield put(
      fetchUserProblemResults.response({
        result: normalizedData.result,
        entities: normalizedData.entities,
        target,
      }),
    );
  } catch (error) {
    yield put(fetchUserProblemResults.error({ error, target }));
  }
}

function* watchUserProblemResultSaga(): SagaIterator {
  yield takeEvery(fetchUserProblemResults.request, fetchResults);
}

export { watchUserProblemResultSaga };
