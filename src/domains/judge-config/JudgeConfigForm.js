import * as React from 'react';
import { useFormik } from 'formik';
import { Judger } from './types';
import { useErrorMessageRenderer } from '../../components/form';
import { JudgeConfigValidation } from './validation';
import { StatelessJudgeConfigForm } from './StatelessJudgeConfigForm';

export function useJudgeConfigForm(props = {}) {
  const { initialValues, onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      inputFileName: initialValues?.inputFileName ?? '',
      outputFileName: initialValues?.outputFileName ?? '',
      judger: initialValues?.judger ?? Judger.LINES_WORDS_CASE,
      problemId: initialValues?.problemId ?? undefined
    },
    validationSchema: JudgeConfigValidation.schema,
    onSubmit: values => onSubmit?.(values)
  });
  const { touched, setTouched, errors, status, setFieldValue } = formik;

  const setAllTouched = React.useCallback(() => {
    const touched = JudgeConfigValidation.fields.reduce((obj, key) => {
      obj[key] = true;
      return obj;
    }, {});
    setTouched(touched);
  }, [setTouched]);

  const errorMessageRenderer = useErrorMessageRenderer({
    touched,
    errors,
    status
  });

  const handleTestPackageChange = React.useCallback(file => {
    setFieldValue('testPackageFile', file);
  }, []);

  const handleExternalJudgerChange = React.useCallback(file => {
    setFieldValue('externalJudger', file);
  }, []);

  return {
    ...formik,
    handleTestPackageChange,
    handleExternalJudgerChange,
    errorMessageRenderer,
    setAllTouched
  };
}

export function JudgeConfigForm(props) {
  const { initialValues, onSubmit, ...rest } = props;
  const allProps = useJudgeConfigForm({ initialValues, onSubmit });

  return <StatelessJudgeConfigForm {...allProps} {...rest} />;
}
