import { schema } from 'normalizr';

const submissionLangSchema = new schema.Entity('submissionLang');
const submissionLangArraySchema = new schema.Array(submissionLangSchema);

export { submissionLangSchema, submissionLangArraySchema };
