import { apiCaller } from '../utility/Axios';
import * as qs from 'qs';
import { FilterConverter } from '../utility/filter';
import { serverConfigs } from '../server';

const BASE_URL = '/submission';

export class SubmissionService {
  static createSubmission(formData) {
    return apiCaller.post(BASE_URL, formData);
  }

  static createSubmissionByFile(formData) {
    return apiCaller.post(BASE_URL, formData, { params: { type: 'file' } });
  }

  static getSubmissionDetailsById(submissionId) {
    return apiCaller.get(`${BASE_URL}/${submissionId}/details`);
  }

  static getSubmissionResultLogById(submissionId) {
    return apiCaller.get(`${BASE_URL}/${submissionId}/result-log`);
  }

  static getDetailedSubmissionById(submissionId) {
    return apiCaller.get(`${BASE_URL}/${submissionId}/details`);
  }

  static getSubmissions(params, pageable = { page: 0, size: 10 }) {
    return apiCaller.get(BASE_URL, {
      params: {
        ...params,
        page: pageable.page,
        size: pageable.size
      }
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
        size: pageable.pageSize
      }
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
        size: pageable.pageSize
      }
    });
  }

  static getStream(submissions) {
    const queryString = qs.stringify(
      { ids: submissions.map(sub => sub.id) },
      { arrayFormat: 'comma' }
    );
    return new EventSource(
      `${serverConfigs.getBaseURL()}${BASE_URL}/stream?${queryString}`
    );
  }
}
