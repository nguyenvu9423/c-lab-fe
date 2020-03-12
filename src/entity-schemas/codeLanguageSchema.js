import { schema } from 'normalizr';

const codeLanguageSchema = new schema.Entity('codeLanguage');
const codeLanguageArraySchema = new schema.Array(codeLanguageSchema);

export { codeLanguageSchema, codeLanguageArraySchema };
