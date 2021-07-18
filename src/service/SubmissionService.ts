import * as qs from 'qs';
import { Submission } from './../domains/submission/submission';
import { Pageable } from './../utility/Pageable';
import { apiCaller } from '../utility/Axios';
import { serverConfigs } from '../server';
import { SubmissionLanguage } from '../domains/submission-lang/SubmissionLanguage';

const BASE_URL = '/submission';

export namespace SubmissionService {
  export function submit(params: {
    problemId: number;
    language: SubmissionLanguage;
    code: File | string;
  }): Promise<any> {
    const { problemId, language, code } = params;
    const formData = new FormData();

    if (code instanceof File) {
      formData.append('codeFile', code);
    } else {
      formData.append('codeText', code);
    }

    return apiCaller.post(BASE_URL, formData, {
      params: {
        problemId,
        language,
      },
    });
  }

  export function rejudgeSubmission(submissionId: number): Promise<any> {
    return apiCaller.post(`${BASE_URL}/${submissionId}/rejudge`);
  }

  export function cancelJudge(submissionId: number): Promise<any> {
    return apiCaller.post(`${BASE_URL}/${submissionId}/cancel-judge`);
  }

  export function getSubmissionDetailsById(submissionId: number): Promise<any> {
    return apiCaller.get(`${BASE_URL}/${submissionId}/details`);
  }

  export function getDetailedResult(submissionId: number): Promise<any> {
    return apiCaller.get(`${BASE_URL}/${submissionId}/detailed-result`);
  }

  export function getDetailedSubmissionById(
    submissionId: number
  ): Promise<any> {
    return apiCaller.get(`${BASE_URL}/${submissionId}/details`);
  }

  export function getSubmissions(
    params: { userId?: number; problemId?: number; query?: string },
    pageable = { page: 0, size: 10 }
  ): Promise<any> {
    return apiCaller.get(BASE_URL, {
      params: {
        ...params,
        page: pageable.page,
        size: pageable.size,
      },
    });
  }

  export function getSubmissionsByUserAndProblem(
    userId: number,
    problemId: number,
    pageable: Pageable
  ): Promise<any> {
    return apiCaller.get(BASE_URL, {
      params: {
        user: userId,
        problem: problemId,
        page: pageable.page,
        size: pageable.size,
      },
    });
  }

  // export function getSubmissionsByProblem(
  //   problemId: number,
  //   filters: number,
  //   pageable: Pageable
  // ): Promise<any> {
  //   return apiCaller.get(`${BASE_URL}`, {
  //     params: {
  //       problem: problemId,
  //       // filters: filters.length ? FilterConverter.toString(filters) : undefined,
  //       page: pageable.page,
  //       size: pageable.size,
  //     },
  //   });
  // }

  export function getStream(submissions: Submission[]): EventSource {
    const queryString = qs.stringify(
      { ids: submissions.map((sub) => sub.id) },
      { arrayFormat: 'comma' }
    );
    return new EventSource(
      `${serverConfigs.getBaseURL()}${BASE_URL}/stream?${queryString}`
    );
  }
}
