import React, { useCallback } from 'react';
import { Input } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useErrorMessageRenderer } from '../form';

export namespace NumberRangeInput {
  export interface Props {
    onChange?: (value: Value) => void;
  }

  export interface Value {
    from?: number;
    to?: number;
  }
}

export const NumberRangeInput: React.FC<NumberRangeInput.Props> = ({
  onChange,
}) => {
  const {
    values,
    errors,
    touched,
    isValid,
    setFieldValue,
    handleBlur: formikHandleBlur,
  } = useFormik<NumberRangeInput.Value>({
    initialValues: {},
    onSubmit: () => {},
    validationSchema,
  });

  const handleBlur = useCallback(
    (event) => {
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
        style={{ maxWidth: 80 }}
        min={0}
        type="number"
        placeholder="From"
        value={values.from ?? ''}
        onChange={({ target }) => {
          setFieldValue(
            'from',
            target.value !== '' ? Number(target.value) : undefined,
          );
        }}
        onBlur={handleBlur}
      />{' '}
      -{' '}
      <Input
        name="to"
        min={0}
        style={{ maxWidth: 80 }}
        type="number"
        placeholder="To"
        value={values.to ?? ''}
        onChange={({ target }) => {
          setFieldValue(
            'to',
            target.value !== '' ? Number(target.value) : undefined,
          );
        }}
        onBlur={handleBlur}
      />
      {errors.from ? errorMessageRenderer('from') : errorMessageRenderer('to')}
    </>
  );
};

const validationSchema = yup.object({
  from: yup.number().min(0, 'Các số phải lớn hơn 0'),
  to: yup
    .number()
    .test('isGreaterThanFrom', 'Khoảng giá trị không hợp lệ', (to, context) => {
      const { from } = context.parent;
      if (from === undefined || to === undefined) return true;
      return to >= from;
    }),
});
