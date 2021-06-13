import { schema } from 'normalizr';
import { judgeSchema } from './judge-schemas';

const submissionSchema = new schema.Entity('submission', {
  judge: judgeSchema,
});

const detailedSubmissionSchema = submissionSchema;

const submissionsSchema = new schema.Array(submissionSchema);

export { submissionSchema, submissionsSchema, detailedSubmissionSchema };
