import { schema } from 'normalizr';
import { Article } from './Article';
import { tagArraySchema } from '../tag';

export const articleSchema = new schema.Entity<Article>('article', {
  tags: tagArraySchema,
});

export const articleArraySchema = new schema.Array(articleSchema);
