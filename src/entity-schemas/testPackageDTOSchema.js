import { schema } from 'normalizr';

const testPackageDTOSchema = new schema.Entity('testPackage');
const testPackageDTOArraySchema = new schema.Array(testPackageDTOSchema);

export { testPackageDTOSchema, testPackageDTOArraySchema };
