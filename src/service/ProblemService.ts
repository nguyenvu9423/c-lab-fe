import { Pageable } from './../utility/Pageable';
import { apiCaller } from '../utility/Axios';
import { Page, ServiceResponse } from './types';
import { ProblemDTO } from '../domains/problem/ProblemDTO';
import { JudgeConfigDTO } from '../domains/judge-config/JudgeConfigDTO';
import { ProblemRejudgeDTO } from '../domains/problem-rejudge/ProblemRejudgeDTO';

const BASE_URL = '/problems';
export namespace ProblemService {
  export function create(problem: ProblemDTO): ServiceResponse<ProblemDTO> {
    return apiCaller.post(BASE_URL, problem, {
      headers: {
        'Content-Type': undefined,
      },
      timeout: 120000,
    });
  }

  export function getProblems(params: {
    query?: string;
    pageable?: Pageable;
  }): ServiceResponse<Page<ProblemDTO>> {
    const { query, pageable } = params;
    return apiCaller.get(BASE_URL, {
      params: {
        ...pageable,
        query,
      },
    });
  }

  export function getProblem(
    code: string,
    detailed?: boolean
  ): ServiceResponse<ProblemDTO> {
    return apiCaller.get(`${BASE_URL}/${code}`, {
      params: {
        detailed,
      },
    });
  }

  export function getJudgeConfig(
    code: string
  ): ServiceResponse<JudgeConfigDTO> {
    return apiCaller.get(`${BASE_URL}/${code}/judge-config`);
  }

  export function getProblemRejudge(
    code: string
  ): ServiceResponse<ProblemRejudgeDTO> {
    return apiCaller.get(`${BASE_URL}/${code}/rejudge`);
  }

  export function updateProblem(
    code: string,
    problem: Partial<ProblemDTO>
  ): ServiceResponse<ProblemDTO> {
    return apiCaller.put(`${BASE_URL}/${code}`, problem);
  }

  export function updateJudgeConfig(
    code: string,
    formData: FormData
  ): ServiceResponse<ProblemDTO> {
    return apiCaller.post(`${BASE_URL}/${code}/judge-config`, formData, {
      timeout: 120000,
    });
  }

  export function rejudgeProblem(code: string): ServiceResponse<ProblemDTO> {
    return apiCaller.post(`${BASE_URL}/${code}/rejudge`);
  }

  export function deleteProblem(code: string): ServiceResponse<void> {
    return apiCaller.delete(`${BASE_URL}/${code}`);
  }
}
