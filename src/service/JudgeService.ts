import * as qs from 'qs';
import { apiCaller } from '../utility/Axios';
import { serverConfigs } from '../server';
import { ServiceResponse } from './types';
import { DetailedJudgeDTO } from '../domains/judge/dtos/DetailedJudgeDTO';

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
      `${serverConfigs.getBaseURL()}${BASE_URL}/stream?${queryString}`
    );
  }

  export function cancel(judgeId: number): ServiceResponse<void> {
    return apiCaller.post(`${BASE_URL}/${judgeId}/cancel`);
  }
}
