import { schema } from 'normalizr';
import { Role } from './../domains/role/Role';

const roleSchema = new schema.Entity<Role>('role');

const roleArraySchema = new schema.Array(roleSchema);

export { roleSchema, roleArraySchema };
