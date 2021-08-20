import { schema } from 'normalizr';
import { Article } from './Article';
import { tagArraySchema } from '../tag';
import { userSchema } from '../../entity-schemas';

export const articleSchema = new schema.Entity<Article>('article', {
  author: userSchema,
  tags: tagArraySchema,
});

export const articleArraySchema = new schema.Array(articleSchema);
