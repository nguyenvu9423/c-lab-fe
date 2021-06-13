import * as qs from 'qs';
import { apiCaller } from '../utility/Axios';
import { FilterConverter } from '../utility/filter';
import { serverConfigs } from '../server';

const BASE_URL = '/submission';

export class SubmissionService {
  static submit({ problemId, languageName, codeFile, codeText }) {
    const formData = new FormData();
    if (codeFile) {
      formData.append('codeFile', codeFile);
    } else {
      formData.append('codeText', codeText);
    }

    return apiCaller.post(BASE_URL, formData, {
      params: {
        problemId,
        languageName,
      },
    });
  }

  static rejudgeSubmission(submissionId) {
    return apiCaller.post(`${BASE_URL}/${submissionId}/rejudge`);
  }

  static cancelJudge(submissionId) {
    return apiCaller.post(`${BASE_URL}/${submissionId}/cancel-judge`);
  }

  static getSubmissionDetailsById(submissionId) {
    return apiCaller.get(`${BASE_URL}/${submissionId}/details`);
  }

  static getDetailedResult(submissionId) {
    return apiCaller.get(`${BASE_URL}/${submissionId}/detailed-result`);
  }

  static getDetailedSubmissionById(submissionId) {
    return apiCaller.get(`${BASE_URL}/${submissionId}/details`);
  }

  static getSubmissions(params, pageable = { page: 0, size: 10 }) {
    return apiCaller.get(BASE_URL, {
      params: {
        ...params,
        page: pageable.page,
        size: pageable.size,
      },
    });
  }

  static getSubmissionsByUserAndProblem(
    userId,
    problemId,
    pageable = { pageNumber: 0, pageSize: 10 }
  ) {
    return apiCaller.get(BASE_URL, {
      params: {
        user: userId,
        problem: problemId,
        page: pageable.pageNumber,
        size: pageable.pageSize,
      },
    });
  }

  static getSubmissionsByProblem(
    problemId,
    filters,
    pageable = { pageNumber: 0 }
  ) {
    return apiCaller.get(`${BASE_URL}`, {
      params: {
        problem: problemId,
        filters: filters.length ? FilterConverter.toString(filters) : undefined,
        page: pageable.pageNumber,
        size: pageable.pageSize,
      },
    });
  }

  static getStream(submissions) {
    const queryString = qs.stringify(
      { ids: submissions.map((sub) => sub.id) },
      { arrayFormat: 'comma' }
    );
    return new EventSource(
      `${serverConfigs.getBaseURL()}${BASE_URL}/stream?${queryString}`
    );
  }
}
