import { apiCaller } from '../utility/Axios';

const ARTICLE_API_URL = '/articles';

class ArticleService {
  static async createArticle(article) {
    return apiCaller.post(ARTICLE_API_URL, {
      ...article,
      contentTable: JSON.stringify(article.contentTable)
    });
  }

  static async getAllArticle() {
    return apiCaller.get(ARTICLE_API_URL);
  }

  static async getArticleById(id) {
    return apiCaller.get(`${ARTICLE_API_URL}/${id}`).then(res => {
      let { data } = res;
      data = { ...data, contentTable: JSON.parse(data.contentTable) };
      return Promise.resolve({ ...res, data });
    });
  }

  static async updateArticle(id, article) {
    return apiCaller.put(`${ARTICLE_API_URL}/${id}`, {
      ...article,
      contentTable: JSON.stringify(article.contentTable)
    });
  }
}

export { ArticleService };
