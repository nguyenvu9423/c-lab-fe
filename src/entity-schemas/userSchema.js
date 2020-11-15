import { schema } from 'normalizr';

const userSchema = new schema.Entity('user');

const usersSchema = new schema.Array(userSchema);

export { userSchema, usersSchema };
