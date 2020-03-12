import { apiCaller } from '../utility/Axios';

const BASE_URL = '/testpackage';

class TestPackageService {
  static create(formData) {
    return apiCaller.post(BASE_URL, formData, {
      headers: {
        'Content-Type': undefined
      },
      timeout: 120000
    });
  }

  static getTestPackages(owningProblemId) {
    return apiCaller.get(BASE_URL, {
      params: {
        owningProblemId
      }
    });
  }
}

export { TestPackageService };
