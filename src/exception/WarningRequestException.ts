import { BaseException } from './BaseException';
import { RequestException } from './BaseResponseException';

export namespace WarningRequestException {
  export function isInstance(
    exception: BaseException
  ): exception is WarningRequestException {
    return exception.type === 'WarningRequestException';
  }
}

export interface WarningRequestException extends RequestException {
  type: 'WarningRequestException';
}
