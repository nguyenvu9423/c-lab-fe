import { schema } from 'normalizr';
import { judgeSchema } from './judge-schemas';

const contestSubmissionSchema = new schema.Entity('contestSubmission', {
  judge: judgeSchema,
});

const contestSubmissionsSchema = new schema.Array(contestSubmissionSchema);

export { contestSubmissionSchema, contestSubmissionsSchema };
