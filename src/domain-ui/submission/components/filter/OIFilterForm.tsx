import * as React from 'react';
import { useFormik } from 'formik';

import { DropdownItemProps, Form } from 'semantic-ui-react';
import { VerdictFilterTypes } from './options';
import { languageOptions } from './shared';
import { ValuePredicateInput } from './ValuePredicateInput';
import { ComparisonOperator } from '@rsql/ast';

export namespace OIFilterForm {
  export interface Props {
    problemOptions?: ProblemOption[];
    onSubmit?: (value: Value) => void;
  }

  export interface Value {
    problem?: string;
    verdict?: VerdictFilterTypes;
    language?: string;
    score?: { operator: ComparisonOperator; value: number };
  }

  interface ProblemOption {
    value: string | undefined;
    text: string;
  }
}

export const OIFilterForm: React.FC<OIFilterForm.Props> = (props) => {
  const { problemOptions, onSubmit } = props;

  const { values, setFieldValue, handleSubmit } = useFormik<OIFilterForm.Value>(
    {
      initialValues: {
        verdict: undefined,
        language: undefined,
      },
      onSubmit: (value) => onSubmit?.(value),
    },
  );

  const handleChange = React.useCallback(
    (event, data) => {
      const { value, name } = data;
      setFieldValue(name, value);
    },
    [setFieldValue],
  );

  return (
    <Form error onSubmit={handleSubmit}>
      <Form.Field>
        <label>Bài tập</label>
        <Form.Select
          placeholder="Bài tập"
          value={values.problem}
          options={problemOptions ?? []}
          name="problem"
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Kết quả</label>
        <Form.Select
          placeholder="Kết quả"
          options={verdictOptions}
          value={values.verdict}
          name="verdict"
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Ngôn ngữ</label>
        <Form.Select
          placeholder="Ngôn ngữ"
          options={languageOptions}
          value={values.language}
          name="language"
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Điểm</label>
      </Form.Field>
      <Form.Field>
        <ValuePredicateInput
          min={0}
          max={100}
          unit="điểm"
          value={values.score}
          onChange={(value) => {
            setFieldValue('score', value);
          }}
        />
      </Form.Field>

      <Form.Button type="submit" floated="right">
        Áp dụng
      </Form.Button>
    </Form>
  );
};

const verdictOptions: DropdownItemProps[] = [{ key: '', text: '' }].concat(
  [VerdictFilterTypes.AC, VerdictFilterTypes.WA].map((type) => ({
    key: type,
    value: type,
    text: VerdictFilterTypes.getProperties(type).text,
  })),
);
