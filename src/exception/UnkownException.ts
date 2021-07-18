import { BaseException } from './BaseException';

export interface UnknownException extends BaseException {
  type: 'unknown';
}

export namespace UnknownException {
  export function createDefault(message = 'Unknown error'): UnknownException {
    return {
      type: 'unknown',
      message,
    };
  }
}
