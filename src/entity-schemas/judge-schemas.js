import { schema } from 'normalizr';

const judgeSchema = new schema.Entity('judge');

const judgesSchema = new schema.Array(judgeSchema);

export { judgeSchema, judgesSchema };
