import * as qs from 'qs';
import { apiCaller } from '../utility/Axios';
import { ServiceResponse } from './types';
import { DetailedJudgeDTO } from '../domains/judge/dtos/DetailedJudgeDTO';
import { BackEndConfig } from '../config';

const BASE_URL = '/judges';

export namespace JudgeService {
  export function getBySubmission(
    submissionId: number,
    detailed?: boolean
  ): ServiceResponse<DetailedJudgeDTO> {
    return apiCaller.get(`${BASE_URL}`, {
      params: { submissionId, detailed },
    });
  }

  export function getJudgesStream(judgeIds: number[]): EventSource {
    const queryString = qs.stringify(
      { ids: judgeIds },
      { arrayFormat: 'comma' }
    );
    return new EventSource(
      `${BackEndConfig.API_URL}${BASE_URL}/stream?${queryString}`
    );
  }

  export function cancel(judgeId: number): ServiceResponse<void> {
    return apiCaller.post(`${BASE_URL}/${judgeId}/cancel`);
  }
}
