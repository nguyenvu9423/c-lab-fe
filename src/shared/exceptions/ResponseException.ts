import { BaseException } from './BaseException';

export interface ResponseException extends BaseException {
  status: number;
}
