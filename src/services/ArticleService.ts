import { apiCaller } from '../utils/Axios';
import { ArticleDTO } from '../domains/article';
import { Page, ServiceResponse } from './types';
import { Pageable } from '../utils';

const ARTICLE_API_URL = '/articles';

export namespace ArticleService {
  export function createArticle(
    formData: FormData
  ): ServiceResponse<ArticleDTO> {
    return apiCaller.post(ARTICLE_API_URL, formData);
  }

  export function getArticles(params: {
    pageable?: Pageable;
    query?: string;
  }): ServiceResponse<Page<ArticleDTO>> {
    const { pageable, query } = params;
    return apiCaller.get(ARTICLE_API_URL, {
      params: {
        ...pageable,
        query,
      },
    });
  }

  export function getArticle(id: number): ServiceResponse<ArticleDTO> {
    return apiCaller.get(`${ARTICLE_API_URL}/${id}`);
  }

  export function updateArticle(
    id: number,
    formData: FormData
  ): ServiceResponse<ArticleDTO> {
    return apiCaller.put(`${ARTICLE_API_URL}/${id}`, formData);
  }

  export function deleteArticle(id: number): ServiceResponse<void> {
    return apiCaller.delete(`${ARTICLE_API_URL}/${id}`);
  }
}
