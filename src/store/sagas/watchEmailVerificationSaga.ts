import { SagaIterator } from 'redux-saga';
import { call, put, race, select, take, takeEvery } from 'redux-saga/effects';
import { EmailVerificationService } from '../../services/auth/EmailVerificationService';
import { refreshToken, verifyEmail } from '../actions';
import { AuthenticationSelectors } from '../selectors';
import { EmailVerificationDTO } from '@/services/dtos';

function* verifyEmailSaga(action): SagaIterator {
  const { id, target } = action.payload;
  try {
    const response = yield call(EmailVerificationService.verify, id);
    const emailVerification: EmailVerificationDTO = response.data;

    const currentUsername = yield select(AuthenticationSelectors.username());
    let hasRefreshedToken: boolean | undefined;
    if (currentUsername == emailVerification.user.username) {
      yield put(refreshToken.request());
      const { success } = yield race({
        success: take(refreshToken.response),
        failed: take(refreshToken.failed),
      });
      hasRefreshedToken = !!success;
    }

    yield put(
      verifyEmail.response({
        id: emailVerification.id,
        user: emailVerification.user,
        hasRefreshedToken,
        target,
      }),
    );
  } catch (error) {
    yield put(verifyEmail.error({ error, target }));
  }
}

export function* watchEmailVerificationSaga(): SagaIterator {
  yield takeEvery(verifyEmail.request, verifyEmailSaga);
}
