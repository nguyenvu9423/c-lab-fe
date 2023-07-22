import { schema } from 'normalizr';
import { userSchema } from './userSchema';
import {
  judgeConfigSchema,
  detailedJudgeConfigSchema,
} from './judge-config-schemas';
import { tagArraySchema } from './tag-schemas';
import { Problem, DetailedProblem } from '@/domains/problem';
import { problemRejudgeSchema } from './problemRejudge';

export const problemSchema = new schema.Entity<Problem>('problem', {
  author: userSchema,
  judgeConfig: judgeConfigSchema,
  tags: tagArraySchema,
});

export const detailedProblemSchema = new schema.Entity<DetailedProblem>(
  'detailedProblem',
  {
    author: userSchema,
    judgeConfig: detailedJudgeConfigSchema,
    tags: tagArraySchema,
    problemRejudge: problemRejudgeSchema,
  }
);

export const problemArraySchema = new schema.Array(problemSchema);
