import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(8, 'Invalid username')
    .max(24, 'Invalid username'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Invalid password')
    .max(24, 'Invalid password')
});
