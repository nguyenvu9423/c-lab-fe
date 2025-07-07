import { schema } from 'normalizr';
import { submissionSchema } from './submission-schemas';

export const userProblemResultSchema = new schema.Entity(
  'userProblemResult',
  {
    bestSubmission: submissionSchema,
  },
  { idAttribute: (value) => `${value.userId}-${value.problemId}` },
);

export const userProblemResultsSchema = new schema.Array(
  userProblemResultSchema,
);
