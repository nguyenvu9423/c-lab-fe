import { BaseException } from './BaseException';
import { ResponseException } from './ResponseException';

export namespace WarningRequestException {
  export function isInstance(
    exception: BaseException,
  ): exception is WarningRequestException {
    return exception.type === 'WarningRequestException';
  }
}

export interface WarningRequestException extends ResponseException {
  type: 'WarningRequestException';
}
