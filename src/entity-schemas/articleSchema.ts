import { schema } from 'normalizr';
import { Article } from '@/domains/article';
import { tagArraySchema } from './tag-schemas';
import { userSchema } from './userSchema';

export const articleSchema = new schema.Entity<Article>('article', {
  author: userSchema,
  tags: tagArraySchema,
});

export const articleArraySchema = new schema.Array(articleSchema);
