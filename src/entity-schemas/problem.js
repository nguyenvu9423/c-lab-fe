import { schema } from 'normalizr';
import { judgeConfigArraySchema, judgeConfigSchema } from './judgeConfigSchema';

const problemSchema = new schema.Entity('problem', {
  activeJudgeConfig: judgeConfigSchema,
  judgeConfigs: judgeConfigArraySchema
});
const problemArraySchema = new schema.Array(problemSchema);

export { problemSchema, problemArraySchema };
