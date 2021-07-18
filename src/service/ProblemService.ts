import { Pageable } from './../utility/Pageable';
import { apiCaller } from '../utility/Axios';

const BASE_URL = '/problems';
export namespace ProblemService {
  export function create(problem): Promise<any> {
    return apiCaller.post(BASE_URL, problem, {
      headers: {
        'Content-Type': undefined,
      },
      timeout: 120000,
    });
  }

  export function getProblems(params: {
    query?: string;
    pageable: Pageable;
  }): Promise<any> {
    const { query, pageable } = params;
    return apiCaller.get(BASE_URL, {
      params: {
        ...pageable,
        query,
      },
    });
  }

  export function getProblemByQuery(
    query,
    pageable = { page: 0, size: 10 }
  ): Promise<any> {
    return apiCaller.get(BASE_URL, {
      params: {
        query,
        ...pageable,
      },
    });
  }

  export function getProblem(id: number, detailed?: boolean): Promise<any> {
    return apiCaller.get(`${BASE_URL}/${id}`, {
      params: {
        detailed,
      },
    });
  }

  export function getProblemByCode(
    code: string,
    detailed?: boolean
  ): Promise<any> {
    return apiCaller.get(BASE_URL, {
      params: { code, detailed },
    });
  }

  export function getProblemById(id): Promise<any> {
    return apiCaller.get(`${BASE_URL}/${id}`);
  }

  export function getJudgeConfig(problemId): Promise<any> {
    return apiCaller.get(`${BASE_URL}/${problemId}/judge-config`);
  }

  export function updateProblem(id, problem): Promise<any> {
    return apiCaller.put(`${BASE_URL}/${id}`, problem);
  }

  export function updateJudgeConfig(id, formData): Promise<any> {
    return apiCaller.post(`${BASE_URL}/${id}/judge-config`, formData, {
      timeout: 120000,
    });
  }

  export function rejudgeProblem(problemId): Promise<any> {
    return apiCaller.post(`${BASE_URL}/${problemId}/rejudge`);
  }

  export function getByProblem(problemId): Promise<any> {
    return apiCaller.get(`${BASE_URL}/${problemId}/rejudge`);
  }

  // export function getByProblemCode(problemCode): Promise<any> {
  //   return apiCaller.get(`${BASE_URL}/${problemId}/rejudge`);
  // }

  export function deleteProblem(id): Promise<any> {
    return apiCaller.delete(`${BASE_URL}/${id}`);
  }
}
