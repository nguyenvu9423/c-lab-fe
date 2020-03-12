import { schema } from 'normalizr';

const articleSchema = new schema.Entity('article');
const articleArraySchema = new schema.Array(articleSchema);

export { articleSchema, articleArraySchema };
