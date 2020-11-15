import * as yup from 'yup';
import { Judger } from './types';

const objectShape = {
  inputFileName: yup.string().required('Input file name is required'),
  outputFileName: yup.string().when('judger', {
    is: value => value !== Judger.EXTERNAL,
    then: yup.string().required('Output file name is required')
  }),
  externalJudger: yup.mixed().when('judger', {
    is: Judger.EXTERNAL,
    then: yup.mixed().required('External judger is required')
  }),
  testPackageFile: yup.mixed().required('Test package file is required')
};

export const JudgeConfigValidation = {
  schema: yup.object(objectShape),
  fields: Object.keys(objectShape)
};
