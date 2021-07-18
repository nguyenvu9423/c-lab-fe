import { schema } from 'normalizr';
import { Tag } from './Tag';

export const tagSchema = new schema.Entity<Tag>('tag');

export const tagArraySchema = new schema.Array(tagSchema);
