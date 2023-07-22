import * as qs from 'qs';
import { BackEndConfig } from '../../config';
import { apiCaller } from '../../utils/Axios';
import { ServiceResponse } from '../types';

const BASE_URL = '/problem-rejudge';

export namespace ProblemRejudgeService {
  export function getStream(ids: number[]): EventSource {
    const queryString = qs.stringify({ ids }, { arrayFormat: 'comma' });
    return new EventSource(
      `${BackEndConfig.API_URL}${BASE_URL}/stream?${queryString}`
    );
  }

  export function cancel(id: number): ServiceResponse<void> {
    return apiCaller.post(`${BASE_URL}/${id}/cancel`);
  }
}
