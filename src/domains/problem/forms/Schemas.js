import * as yup from 'yup';
import { Judger } from '../../judge-config';

const coreFieldsSchema = {
  code: yup
    .string()
    .matches(
      /^[A-Z0-9]*$/,
      'Code should only contain uppercase letters and numbers'
    )
    .required('Code is required')
    .min(3, 'Code should be at least 3 characters')
    .max(12, 'Code shoud be at most 12 characters'),
  title: yup
    .string()
    .strict()
    .trim('Title should not contain leading and trailing whitespace')
    .required('Title is required')
    .min(3, 'Title should be at least 3 characters')
    .max(64, 'Title should be at most 64 characters'),
  definition: yup
    .string()
    .required('Definition is required')
    .max(640000, 'Definition should only contain 64000 characters'),
  allowedLanguages: yup
    .array()
    .min(1, 'At least one languages should be defined')
};

export const addProblemValidationSchema = yup.object().shape({
  ...coreFieldsSchema
});

export const editProblemValidationSchema = yup.object().shape({
  ...coreFieldsSchema
});
