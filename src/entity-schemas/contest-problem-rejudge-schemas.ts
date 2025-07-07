import { schema } from 'normalizr';

export const contestProblemRejudgeSchema = new schema.Entity(
  'contestProblemRejudge',
);

export const ContestProblemRejudgeArraySchema = new schema.Array(
  contestProblemRejudgeSchema,
);
