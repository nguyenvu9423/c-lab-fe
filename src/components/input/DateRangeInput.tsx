import React, { useCallback } from 'react';
import { Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import { useErrorMessageRenderer } from '../form';

export namespace DateRangeInput {
  export interface Props {
    onChange?: (value: Value) => void;
  }

  export interface Value {
    from?: string;
    to?: string;
  }
}

export const DateRangeInput: React.FC<DateRangeInput.Props> = ({
  onChange,
}) => {
  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur: formikHandleBlur,
  } = useFormik<DateRangeInput.Value>({
    initialValues: {
      from: '',
      to: '',
    },
    onSubmit: () => {},
    validationSchema,
  });

  const handleBlur = useCallback(
    (event) => {
      console.log('🚀 ~ values:', isValid, values);
      formikHandleBlur(event);
      if (isValid) onChange?.(values);
    },
    [isValid, values],
  );

  const errorMessageRenderer = useErrorMessageRenderer({ touched, errors });
  return (
    <>
      <Input
        name="from"
        type="date"
        value={values.from}
        onChange={handleChange}
        onBlur={handleBlur}
      />{' '}
      -{' '}
      <Input
        name="to"
        type="date"
        value={values.to}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.from ? errorMessageRenderer('from') : errorMessageRenderer('to')}
    </>
  );
};

const validationSchema = yup.object({
  from: yup.date(),
  to: yup
    .date()
    .test(
      'isGreaterThanFrom',
      'Khoảng thời gian không hợp lệ',
      (to, context) => {
        const { from } = context.parent;
        if (from === undefined || to === undefined) return true;
        return moment(to).isSameOrAfter(from);
      },
    ),
});
