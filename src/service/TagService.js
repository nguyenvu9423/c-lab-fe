import { apiCaller } from '../utility/Axios';

const BASE_URL = '/tags';

export class TagService {
  static getTagByContainedText(
    containedText,
    pageable = { pageNumber: 0, pageSize: 10 }
  ) {
    return apiCaller.get(BASE_URL, {
      params: {
        contain: containedText,
        page: pageable.pageNumber,
        size: pageable.pageSize
      }
    });
  }
}
