import { apiCaller } from '../utility/Axios';

const BASE_URL = '/codelanguages';

export class CodeLanguageService {
  static getAll() {
    return apiCaller.get(BASE_URL);
  }
}
