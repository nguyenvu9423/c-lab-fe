import { schema } from 'normalizr';

const articleSchema = new schema.Entity('article');
const articleListSchema = new schema.Array(articleSchema);
export { articleSchema, articleListSchema };
