import { schema } from 'normalizr';

const roleSchema = new schema.Entity('role');
const roleArraySchema = new schema.Array(roleSchema);

export { roleSchema, roleArraySchema };
