import { apiCaller } from '../utility/Axios';

const ARTICLE_API_URL = '/articles';

class ArticleService {
  static async createArticle(article) {
    return apiCaller.post(ARTICLE_API_URL, article);
  }

  static async getArticles(page) {
    return apiCaller.get(`${ARTICLE_API_URL}?page=${page}`);
  }

  static async getArticleById(id) {
    return apiCaller.get(`${ARTICLE_API_URL}/${id}`);
  }

  static async updateArticle(id, article) {
    return apiCaller.put(`${ARTICLE_API_URL}/${id}`, article);
  }
}

export { ArticleService };
