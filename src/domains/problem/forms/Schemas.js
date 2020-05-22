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
  timeLimit: yup
    .number()
    .required('Time limit should be defined')
    .min(1, 'Timelimit should be greater than 0ms')
    .max(20000, 'Timelimit shoud be less than 20000ms'),
  memoryLimit: yup
    .number()
    .required('Memory limit should be defined')
    .min(1, 'Memorylimit should be greater than 32mb')
    .max(20000, 'Memorylimit should be less than 1024mb'),
  allowedLanguages: yup
    .array()
    .min(1, 'At least one languages should be defined')
};

export const addProblemValidationSchema = yup.object().shape({
  ...coreFieldsSchema,
  activeJudgeConfig: yup.object({
    externalJudger: yup.mixed().when('judger', {
      is: Judger.EXTERNAL,
      then: yup.mixed().required('External judger is required')
    }),
    inputFileName: yup.string().required('Input file name is required'),
    outputFileName: yup.string().when('judger', {
      is: value => value !== Judger.EXTERNAL,
      then: yup.string().required('Output file name is required')
    }),
    testPackageFile: yup.mixed().required('Test package file is required')
  })
});

export const editProblemValidationSchema = yup.object().shape({
  ...coreFieldsSchema,
  activeTestPackage: yup.mixed().required('Testpackage is required')
});
