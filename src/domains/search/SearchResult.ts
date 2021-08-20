export type SearchResult = ProblemSearchResult | ArticleSearchResult;

export interface BaseSearchResult {
  id: number;
  type: string;
}

export interface ProblemSearchResult extends BaseSearchResult {
  type: 'problem';
  code: string;
  title: string;
}

export interface ArticleSearchResult extends BaseSearchResult {
  type: 'article';
  title: string;
  description: string;
}
