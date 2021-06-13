import * as yup from 'yup';
import { JudgerType } from './types';

const objectShape = {
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
  customJudgerFile: yup.mixed().when('judgerType', {
    is: JudgerType.CUSTOM,
    then: yup.mixed().when('customJudger', {
      is: (value) => value == null,
      then: yup.mixed().required('Custom judger is required'),
    }),
  }),
  testPackageFile: yup.mixed().when('testPackage', {
    is: (value) => value == null,
    then: yup.mixed().required('Test package is required'),
  }),
};

export const JudgeConfigValidation = {
  schema: yup.object(objectShape),
  fields: Object.keys(objectShape),
};
