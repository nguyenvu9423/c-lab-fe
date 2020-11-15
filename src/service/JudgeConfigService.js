import { apiCaller } from '../utility/Axios';

const BASE_URL = '/judge-configs';

class JudgeConfigService {
  static create(formData) {
    return apiCaller.post(BASE_URL, formData, {
      headers: {
        'Content-Type': undefined
      },
      timeout: 120000
    });
  }

  static getJudgeConfigs({ problemId }, pageable = { page: 0, size: 5 }) {
    return apiCaller.get(BASE_URL, {
      params: {
        problemId,
        ...pageable
      }
    });
  }
}

export { JudgeConfigService };
