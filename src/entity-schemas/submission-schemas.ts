import { schema } from 'normalizr';
import { judgeSchema } from './judge-schemas';

const submissionSchema = new schema.Entity('submission', {
  judge: judgeSchema,
});

const detailedSubSchema = new schema.Entity('detailedSub', {
  judge: judgeSchema,
});

const submissionsSchema = new schema.Array(submissionSchema);

export { submissionSchema, submissionsSchema, detailedSubSchema };
