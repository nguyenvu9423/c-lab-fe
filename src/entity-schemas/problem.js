import { schema } from 'normalizr';
import {
  testPackageDTOArraySchema,
  testPackageDTOSchema
} from './testPackageDTOSchema';

const problemSchema = new schema.Entity('problem', {
  activeTestPackage: testPackageDTOSchema,
  testPackages: testPackageDTOArraySchema
});
const problemArraySchema = new schema.Array(problemSchema);

export { problemSchema, problemArraySchema };
