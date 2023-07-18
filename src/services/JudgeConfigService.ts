import { apiCaller } from '../utils/Axios';

const BASE_URL = '/judge-configs';

class JudgeConfigService {
  static create(formData) {
    return apiCaller.post(BASE_URL, formData, {
      timeout: 120000,
    });
  }

  static getByProblem(problemId: number) {
    return apiCaller.get(BASE_URL, {
      params: { problemId },
    });
  }

  static createOrUpdateJudgeConfigOfProblem({ problemId, formData }) {
    return apiCaller.post(BASE_URL, formData, {
      params: { problemId },
      headers: {
        'Content-Type': '',
      },
      timeout: 120000,
    });
  }
}

export { JudgeConfigService };
//
