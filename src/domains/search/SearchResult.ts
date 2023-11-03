export type SearchResult = ProblemSearchResult | ArticleSearchResult;

export interface BaseSearchResult {
  id: number;
  type: string;
}

export interface ProblemSearchResult extends BaseSearchResult {
  type: 'PROBLEM';
  code: string;
  title: string;
}

export interface ArticleSearchResult extends BaseSearchResult {
  type: 'ARTICLE';
  title: string;
  description: string;
}
