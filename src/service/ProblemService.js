import { apiCaller } from '../utility/Axios';
import { FilterConverter } from '../utility/filter/FilterConverter';

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

  static getProblems(filters, pageable = { pageSize: 16, pageNumber: 0 }) {
    return apiCaller.get(BASE_URL, {
      params: {
        size: pageable.pageSize,
        page: pageable.pageNumber,
        filters: filters ? FilterConverter.toString(filters) : undefined
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
}
