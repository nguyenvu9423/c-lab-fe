import { schema } from 'normalizr';

const submissionSchema = new schema.Entity('submission');

const submissionListSchema = new schema.Array(submissionSchema);

export { submissionSchema, submissionListSchema };
