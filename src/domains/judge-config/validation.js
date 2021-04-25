import * as yup from 'yup';
import { JudgerType } from './types';

const objectShape = {
  customJudgerFile: yup.mixed().when('judgerType', {
    is: JudgerType.CUSTOM,
    then: yup.mixed().when('customJudger', {
      is: value => value == null,
      then: yup.mixed().required('Custom judger is required')
    })
  }),
  testPackageFile: yup.mixed().when('testPackage', {
    is: value => value == null,
    then: yup.mixed().required('Test package is required')
  })
};

export const JudgeConfigValidation = {
  schema: yup.object(objectShape),
  fields: Object.keys(objectShape)
};
