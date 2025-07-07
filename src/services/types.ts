import { AxiosResponse } from 'axios';

export type ServiceResponse<T = unknown> = Promise<AxiosResponse<T>>;

export interface Page<T> {
  content: T[];
}
