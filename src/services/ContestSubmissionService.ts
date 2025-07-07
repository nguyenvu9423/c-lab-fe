import { SubmissionLanguage } from '@/domains/submission-lang';
import { Page, ServiceResponse } from './types';
import { apiCaller } from '@/utils/Axios';
import { ContestSubmissionDto } from './dtos';
import { Pageable } from '../utils';

const BASE_URL = '/contest-submissions';

export namespace ContestSubmissionService {
  export function submit(params: {
    contestId: number;
    problemCode: string;
    language: SubmissionLanguage;
    code: File | string;
  }): ServiceResponse<ContestSubmissionDto> {
    const { contestId, problemCode, language, code } = params;
    const formData = new FormData();

    if (code instanceof File) {
      formData.append('codeFile', code);
    } else {
      formData.append('codeText', code);
    }

    SubmissionLanguage.updateLatest(language);

    return apiCaller.post(BASE_URL, formData, {
      params: {
        contestId,
        problemCode,
        language,
      },
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  export function getSubmissions(
    params:
      | { contestId: number; query?: string }
      | { contestId: number; username: string },
    pageable?: Pageable,
  ): ServiceResponse<Page<ContestSubmissionDto>> {
    return apiCaller.get(BASE_URL, {
      params: {
        ...params,
        page: pageable?.page,
        size: pageable?.size,
      },
    });
  }
}
