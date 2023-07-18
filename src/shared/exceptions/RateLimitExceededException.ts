import { BaseException } from './BaseException';

export interface RateLimitExceededException extends BaseException {
  type: 'RateLimitExceeded';

  capacity: number;

  time: number;
}

export namespace RateLimitExceededException {
  export function isInstance(
    exception: BaseException
  ): exception is RateLimitExceededException {
    return exception.type === 'RateLimitExceeded';
  }

  export function toMessage(exception: RateLimitExceededException) {
    return `Vượt quá số lần giới hạn. Chỉ được gửi tối đa ${exception.capacity} lần trong ${exception.time} phút`;
  }
}
