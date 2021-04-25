import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(8, 'Username should be at least 8 characters')
    .max(24, 'Username should be at most 24 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters')
    .max(24, 'Password should be at most 24 characters'),
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name should be at least 2 characters')
    .max(24, 'First name should be at most 64 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name should be at least 2 characters')
    .max(24, 'Last name should be at most 64 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email is not valid')
});

export default validationSchema;
