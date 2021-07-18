import { User } from './../user/User';
import { ArticleStatus } from './ArticleStatus';

export interface Article {
  id: number;

  author: User;

  status: ArticleStatus;

  title: string;

  subtitle: string;

  overview: string;

  content: string;

  thumbnail?: string;

  tags: number[];
}
