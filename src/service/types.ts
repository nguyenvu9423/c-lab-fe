import { AxiosResponse } from 'axios';

export type ServiceResponse<T> = Promise<AxiosResponse<T>>;
