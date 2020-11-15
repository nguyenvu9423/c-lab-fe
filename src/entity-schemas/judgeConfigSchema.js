import { schema } from 'normalizr';

const judgeConfigSchema = new schema.Entity('judgeConfig');
const judgeConfigArraySchema = new schema.Array(judgeConfigSchema);

export { judgeConfigSchema, judgeConfigArraySchema };
