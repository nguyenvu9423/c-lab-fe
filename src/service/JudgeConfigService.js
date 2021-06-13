import { apiCaller } from '../utility/Axios';

const BASE_URL = '/judge-configs';

class JudgeConfigService {
  static create(formData) {
    return apiCaller.post(BASE_URL, formData, {
      headers: {
        'Content-Type': undefined,
      },
      timeout: 120000,
    });
  }

  static getJudgeConfig({ problemId }) {
    return apiCaller.get(BASE_URL, {
      params: { problemId },
    });
  }

  static createOrUpdateJudgeConfigOfProblem({ problemId, formData }) {
    return apiCaller.post(BASE_URL, formData, {
      params: { problemId },
      headers: {
        'Content-Type': undefined,
      },
      timeout: 120000,
    });
  }
}

export { JudgeConfigService };
