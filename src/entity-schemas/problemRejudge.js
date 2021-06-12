import { schema } from 'normalizr';

export const problemRejudgeSchema = new schema.Entity('problemRejudge');

export const ProblemRejudgeArraySchema = new schema.Array(problemRejudgeSchema);
