import { apiCaller } from '@/utils/Axios';
import { ServiceResponse } from '../types';
import QueryString from 'qs';
import { BackEndConfig } from 'src/config';

const BASE_URL = '/contest-rejudges';

export namespace ContestRejudgeService {
  export function getLatest(params: {
    contestId: number;
    problemId: number;
  }): ServiceResponse {
    const { contestId, problemId } = params;
    return apiCaller.get(`${BASE_URL}/latest`, {
      params: { contestId, problemId },
    });
  }

  export function rejudgeProblem(params: {
    contestId: number;
    problemId: number;
  }): ServiceResponse {
    const { contestId, problemId } = params;
    return apiCaller.post(BASE_URL, undefined, {
      params: { contestId, problemId },
    });
  }

  export function getProblemRejudgeStream(ids: number[]): EventSource {
    const queryString = QueryString.stringify(
      { ids },
      { arrayFormat: 'comma' },
    );
    return new EventSource(
      `${BackEndConfig.API_URL}${BASE_URL}/stream?${queryString}`,
    );
  }

  export function cancel(id: number): ServiceResponse<void> {
    return apiCaller.post(`${BASE_URL}/${id}/cancel`);
  }
}
