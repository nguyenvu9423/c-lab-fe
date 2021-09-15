import { ArticleStatus } from './ArticleStatus';

export interface Article {
  id: number;

  author: number;

  status: ArticleStatus;

  title: string;

  subtitle: string;

  overview: string;

  content: string;

  thumbnail?: string;

  contentTableShown: boolean;

  tags: number[];

  slug: string;
}
