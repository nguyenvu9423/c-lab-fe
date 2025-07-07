import * as React from 'react';

import { useFormik } from 'formik';
import { Form } from 'semantic-ui-react';
import { VerdictFilterTypes } from './options';

import { languageOptions } from './shared';
import { ValuePredicateInput } from './ValuePredicateInput';
import { ComparisonOperator } from '@rsql/ast';

export namespace AcmFilterForm {
  export interface Props {
    problemOptions?: ProblemOption[];
    onSubmit?: (value: Value) => void;
  }

  interface ProblemOption {
    value: string | undefined;
    text: string;
  }

  export interface Value {
    problem?: string;
    verdict?: VerdictFilterTypes;
    language?: string;
    passedTestCount?: { operator: ComparisonOperator; value: number };
  }
}

export const AcmFilterForm: React.FC<AcmFilterForm.Props> = (props) => {
  const { problemOptions, onSubmit } = props;

  const { values, setFieldValue, handleSubmit } =
    useFormik<AcmFilterForm.Value>({
      initialValues: {},
      onSubmit: (value) => onSubmit?.(value),
    });

  const handleChange = React.useCallback(
    (event, data) => {
      const { value, name } = data;
      setFieldValue(name, value);
    },
    [setFieldValue],
  );

  return (
    <Form onSubmit={handleSubmit}>
      {problemOptions && (
        <Form.Field>
          <label>Bài tập</label>
          <Form.Select
            placeholder="Bài tập"
            value={values.problem}
            options={problemOptions}
            name="problem"
            onChange={handleChange}
          />
        </Form.Field>
      )}
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
        <label>Số test đúng</label>
      </Form.Field>
      <Form.Field>
        <ValuePredicateInput
          value={values.passedTestCount}
          unit="tests"
          min={0}
          onChange={(value) => setFieldValue('passedTestCount', value)}
        />
      </Form.Field>

      <Form.Button type="submit" floated="right">
        Áp dụng
      </Form.Button>
    </Form>
  );
};

const verdictOptions: { value?: string; text: string }[] = [
  { key: '', text: '' },
].concat(
  VerdictFilterTypes.values.map((type) => ({
    key: type,
    value: type,
    text: VerdictFilterTypes.getProperties(type).text,
  })),
);
