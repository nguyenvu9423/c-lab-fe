import { apiCaller } from '../utility/Axios';

const BASE_URL = '/problems';
export class ProblemService {
  static create(problem) {
    return apiCaller.post(BASE_URL, problem, {
      headers: {
        'Content-Type': undefined
      },
      timeout: 120000
    });
  }

  static getProblems(
    { query, pageable } = { query: {}, pageable: { size: 16, page: 0 } }
  ) {
    return apiCaller.get(BASE_URL, {
      params: {
        ...pageable,
        query
      }
    });
  }

  static getProblemByQuery(query, pageable = { page: 0, size: 10 }) {
    return apiCaller.get(BASE_URL, {
      params: {
        query,
        ...pageable
      }
    });
  }

  static getProblem(id) {
    return apiCaller.get(`${BASE_URL}/${id}`);
  }

  static getProblemByParams(params) {
    return apiCaller.get(BASE_URL, {
      params
    });
  }

  static getProblemById(id) {
    return apiCaller.get(`${BASE_URL}/${id}`);
  }

  static updateProblem(id, problem) {
    return apiCaller.put(`${BASE_URL}/${id}`, problem);
  }

  static updateJudgeConfig(id, formData) {
    return apiCaller.post(`${BASE_URL}/${id}/judge-config`, formData, {
      timeout: 120000
    });
  }

  static rejudgeProblem(problemId) {
    return apiCaller.post(`${BASE_URL}/${problemId}/rejudge`);
  }

  static getProblemRejudge(problemId) {
    return apiCaller.get(`${BASE_URL}/${problemId}/rejudge`);
  }

  static deleteProblem(id) {
    return apiCaller.delete(`${BASE_URL}/${id}`);
  }
}
