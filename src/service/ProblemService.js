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

  static getProblems(page = 0) {
    return apiCaller.get(`${BASE_URL}?page=${page}`);
  }

  static getProblem(params) {
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
}
