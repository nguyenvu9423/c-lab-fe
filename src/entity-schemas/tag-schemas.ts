import { schema } from 'normalizr';
import { Tag } from '@/domains/tag';

export const tagSchema = new schema.Entity<Tag>('tag');

export const tagArraySchema = new schema.Array(tagSchema);
