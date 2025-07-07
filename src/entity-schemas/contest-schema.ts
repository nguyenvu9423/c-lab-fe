import { schema } from 'normalizr';
import { Contest } from '@/domains/contest';
import { problemSchema } from './problem-schemas';

const problemConfigSchema = new schema.Object({
  problem: problemSchema,
});

const problemConfigArraySchema = new schema.Array(problemConfigSchema);

export const contestSchema = new schema.Entity<Contest>('contest', {
  judgeConfig: {
    problemConfigs: problemConfigArraySchema,
  },
});

export const contestArraySchema = new schema.Array(contestSchema);
