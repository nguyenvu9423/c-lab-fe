import { schema } from 'normalizr';

export const userSchema = new schema.Entity('user');

export const usersSchema = new schema.Array(userSchema);
