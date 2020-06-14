import { apiCaller } from '../utility/Axios';

const BASE_URL = '/submission-langs';

export class SubmissionLangService {
  static getAll() {
    return apiCaller.get(BASE_URL);
  }
}
