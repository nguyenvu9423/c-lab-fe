import { apiCaller } from '../utility/Axios';

const BASE_URL = '/tags';

export class TagService {
  static createTag(tag) {
    return apiCaller.post(BASE_URL, tag);
  }

  static getTags(pageable = { page: 0, size: 10 }, query) {
    return apiCaller.get(BASE_URL, {
      params: {
        page: pageable.page,
        size: pageable.size,
        query
      }
    });
  }

  static getTagById(id) {
    return apiCaller.get(`${BASE_URL}/${id}`);
  }

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

  static updateTag(id, tag) {
    return apiCaller.put(`${BASE_URL}/${id}`, tag);
  }

  static deleteTag(id, suppressWarning) {
    return apiCaller.delete(`${BASE_URL}/${id}`, {
      params: {
        suppressWarning
      }
    });
  }
}
