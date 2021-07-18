import { apiCaller } from '../utility/Axios';

const ARTICLE_API_URL = '/articles';

export class ArticleService {
  static async createArticle(formData) {
    return apiCaller.post(ARTICLE_API_URL, formData);
  }

  static async getArticles(params) {
    const { pageable = { page: 0, size: 16 }, query } = params;
    return apiCaller.get(ARTICLE_API_URL, {
      params: {
        size: pageable.size,
        page: pageable.page,
        query: query ? query : undefined,
      },
    });
  }

  static async getArticle(id) {
    return apiCaller.get(`${ARTICLE_API_URL}/${id}`);
  }

  static async updateArticle(id, formData) {
    return apiCaller.put(`${ARTICLE_API_URL}/${id}`, formData);
  }

  static async deleteArticle(id) {
    return apiCaller.delete(`${ARTICLE_API_URL}/${id}`);
  }
}
