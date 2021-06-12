import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^ROLE_[A-Z0-9_]*/,
      'Name have to start with "ROLE_" and contains only uppercase letter, number and underscore'
    ),
  permissions: yup.array().min(1, 'Role should have at least 1 permission')
});
