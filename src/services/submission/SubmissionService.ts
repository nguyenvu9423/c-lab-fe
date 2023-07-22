import { apiCaller } from '../../utils/Axios';
import { SubmissionLanguage } from '@/domains/submission-lang';
import { Page, ServiceResponse } from '../types';
import { DetailedSubDTO, SubmissionDTO } from '../dtos';
import { Pageable } from '../../utils';

const BASE_URL = '/submissions';

export namespace SubmissionService {
  export function submit(params: {
    problemCode: string;
    language: SubmissionLanguage;
    code: File | string;
  }): ServiceResponse<SubmissionDTO> {
    const { problemCode, language, code } = params;
    const formData = new FormData();

    if (code instanceof File) {
      formData.append('codeFile', code);
    } else {
      formData.append('codeText', code);
    }

    SubmissionLanguage.updateLatest(language);

    return apiCaller.post(BASE_URL, formData, {
      params: {
        problemCode,
        language,
      },
    });
  }

  export function getSubmissions(
    params:
      | { query?: string }
      | { username: string }
      | { problemCode: string }
      | { username: string; problemCode: string },
    pageable?: Pageable
  ): ServiceResponse<Page<SubmissionDTO>> {
    const query =
      'query' in params && params.query && params.query.length !== 0
        ? params.query
        : undefined;

    return apiCaller.get(BASE_URL, {
      params: {
        ...params,
        query,
        page: pageable?.page,
        size: pageable?.size,
      },
    });
  }

  export function getSubmission(
    submissionId: number,
    detailed?: boolean
  ): ServiceResponse<DetailedSubDTO> {
    return apiCaller.get(`${BASE_URL}/${submissionId}`, {
      params: {
        detailed,
      },
    });
  }

  export function rejudge(id: number): ServiceResponse<SubmissionDTO> {
    return apiCaller.post(`${BASE_URL}/${id}/rejudge`);
  }

  export function updateDisqualified(
    id: number,
    disqualified: boolean
  ): ServiceResponse<SubmissionDTO> {
    return apiCaller.post(`${BASE_URL}/${id}/update`, undefined, {
      params: {
        disqualified,
      },
    });
  }

  export function cancelJudge(submissionId: number): ServiceResponse<void> {
    return apiCaller.post(`${BASE_URL}/${submissionId}/cancel-judge`);
  }
}
