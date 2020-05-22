import { apiCaller } from '../utility/Axios';

const BASE_URL = '/search';

export class SearchService {
  static search(searchString) {
    return apiCaller.get(BASE_URL, {
      params: {
        query: searchString
      }
    });
  }
}
