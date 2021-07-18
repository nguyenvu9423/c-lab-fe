import { BaseException } from './BaseException';

export interface RequestException extends BaseException {
  status: number;
}
