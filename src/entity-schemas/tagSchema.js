import { schema } from 'normalizr';

export const tagSchema = new schema.Entity('tag');

export const tagArraySchema = new schema.Array(tagSchema);
