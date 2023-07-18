import { SubmissionLanguage } from '../domains/submission-lang/SubmissionLanguage';
import { apiCaller } from '../utils/Axios';
import { ServiceResponse } from './types';

const BASE_URL = '/submission-langs';

export namespace SubmissionLangService {
  export function getAll(): ServiceResponse<SubmissionLanguage[]> {
    return apiCaller.get(BASE_URL);
  }
}
