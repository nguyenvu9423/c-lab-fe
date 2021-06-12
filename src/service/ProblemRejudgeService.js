import * as qs from 'qs';
import { serverConfigs } from '../server';
import { apiCaller } from '../utility/Axios';

const BASE_URL = '/problem-rejudge';

export class ProblemRejudgeService {
  static getStream(problemRejudgeIds) {
    const queryString = qs.stringify(
      { ids: problemRejudgeIds },
      { arrayFormat: 'comma' }
    );
    return new EventSource(
      `${serverConfigs.getBaseURL()}${BASE_URL}/stream?${queryString}`
    );
  }

  static cancel(id) {
    return apiCaller.post(`${BASE_URL}/${id}/cancel`);
  }
}
