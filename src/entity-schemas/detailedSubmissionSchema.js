import { schema } from 'normalizr';
import { submissionSchema } from './submissionSchema';

const detailedSubmissionSchema = new schema.Object({
  submission: submissionSchema
});

export { detailedSubmissionSchema };
