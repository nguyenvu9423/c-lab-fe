import { schema } from 'normalizr';
import { userSchema, problemRejudgeSchema } from '../../entity-schemas';
import { judgeConfigSchema } from './../judge-config/judge-config-schemas';
import { tagArraySchema } from '../tag';
import { Problem, DetailedProblem } from './Problem';

export const problemSchema = new schema.Entity<Problem>('problem', {
  author: userSchema,
  judgeConfig: judgeConfigSchema,
  tags: tagArraySchema,
});

export const detailedProblemSchema = new schema.Entity<DetailedProblem>(
  'detailedProblem',
  {
    author: userSchema,
    judgeConfig: judgeConfigSchema,
    tags: tagArraySchema,
    problemRejudge: problemRejudgeSchema,
  }
);

export const problemArraySchema = new schema.Array(problemSchema);
