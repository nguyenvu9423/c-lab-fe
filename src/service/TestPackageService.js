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

  static getTestPackagesByOwningProblem(
    owningProblemId,
    pageable = { pageNumber: 0, pageSize: 5 }
  ) {
    return apiCaller.get(BASE_URL, {
      params: {
        owningProblemId,
        page: pageable.pageNumber,
        size: pageable.pageSize
      }
    });
  }
}

export { TestPackageService };
