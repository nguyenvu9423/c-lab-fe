import React from 'react';
import { Form } from 'semantic-ui-react';
import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';

import { SubmitButton } from '@/components/button';
import { useErrorMessageRenderer } from '@/components/form';
import { Problem } from '@/domains/problem';
import { ProblemSelect } from '../ProblemSelect';

export namespace ProblemConfigForm {
  export interface Props {
    initialValue?: Partial<Value>;

    onSubmit?: (
      value: Value,
      helpers: FormikHelpers<ProblemConfigForm.Value>,
    ) => void;
  }

  export interface Value {
    code: string;

    score: number;

    problem: Problem;
  }
}

function getPrecision(num: number): number {
  const numString = String(num);

  if (numString.indexOf('.') === -1) return 0;
  return String(num).split('.')[1]?.length;
}

const validationSchema = yup.object({
  code: yup
    .string()
    .trim()
    .required('Vui lòng nhập mã bài')
    .min(1, 'Mã bài phải có ít nhất 1 kí tự')
    .max(12, 'Mã bài không được vượt quá 12 kí tự')
    .matches(/^[A-Z0-9]*$/, 'Mã bài chỉ có thể chứa chữ hoa hoặc số'),
  problem: yup.object().required('Vui lòng chọn bài tập'),
  score: yup
    .number()
    .required('Vui lòng chọn số điểm')
    .positive()
    .test(
      'maxPrecision',
      'Số điểm không được chứa quá 2 chữ số sau dấu phẩy',
      (val) => getPrecision(val) <= 2,
    ),
});

export const ProblemConfigForm: React.FC<ProblemConfigForm.Props> = (props) => {
  const { initialValue, onSubmit } = props;

  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      code: initialValue?.code ?? '',
      score: initialValue?.score ?? 1,
      problem: initialValue?.problem,
    },
    onSubmit: (values, helpers) => {
      if (!values.problem) return;
      onSubmit?.(
        { ...values, problem: values.problem },
        helpers as unknown as FormikHelpers<ProblemConfigForm.Value>,
      );
    },
    validationSchema,
  });

  const errorMessageRenderer = useErrorMessageRenderer({ errors, touched });

  return (
    <Form error onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Bài tập</label>
          <ProblemSelect
            initialQuery={values.problem?.code}
            onChange={(problem) => setFieldValue('problem', problem)}
          />
          {errorMessageRenderer('problem')}
        </Form.Field>
        <Form.Field>
          <label>Mã</label>
          <Form.Input
            type="text"
            name="code"
            value={values.code}
            onChange={(_event, data) => {
              setFieldValue('code', data.value.toUpperCase());
            }}
            onBlur={handleBlur}
          />
          {errorMessageRenderer('code')}
        </Form.Field>
      </Form.Group>
      <Form.Field width={8}>
        <label>Số điểm</label>
        <Form.Input
          type="number"
          name="score"
          value={values.score}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errorMessageRenderer('score')}
      </Form.Field>
      <SubmitButton floated="right" />
    </Form>
  );
};
