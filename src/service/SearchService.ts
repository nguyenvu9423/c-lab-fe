import { apiCaller } from '../utility/Axios';
import { ServiceResponse } from './types';

const BASE_URL = '/search';

export namespace SearchService {
  export function search(searchString: string): ServiceResponse<any> {
    return apiCaller.get(BASE_URL, {
      params: {
        query: searchString,
      },
    });
  }
}
