import * as qs from 'qs';
import { apiCaller } from '../utility/Axios';
import { serverConfigs } from '../server';

const BASE_URL = '/judges';

export class JudgeService {
  static getDetailedJudgeBySubmission(submissionId) {
    return apiCaller.get(`${BASE_URL}`, {
      params: { submissionId, detailed: true }
    });
  }

  static getJudgesStream(judgeIds) {
    const queryString = qs.stringify(
      { ids: judgeIds },
      { arrayFormat: 'comma' }
    );
    return new EventSource(
      `${serverConfigs.getBaseURL()}${BASE_URL}/stream?${queryString}`
    );
  }

  static cancel(judgeId) {
    return apiCaller.post(`${BASE_URL}/${judgeId}/cancel`);
  }
}
