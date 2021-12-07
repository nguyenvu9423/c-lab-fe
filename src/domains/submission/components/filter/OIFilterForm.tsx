import * as React from 'react';
import { useFormik } from 'formik';

import { DropdownItemProps, Form, Input } from 'semantic-ui-react';
import { ComparisonOperator } from '../../../../utility/filter';
import { FilterUtils } from '../../../../utility/filter/utils';
import { VerdictFilterTypes } from './options';
import { languageOptions, operationOptions } from './shared';
import { ValuePredicateInput } from './ValuePredicateInput';

const verdictOptions: DropdownItemProps[] = [{ key: '', text: '' }].concat(
  [VerdictFilterTypes.AC, VerdictFilterTypes.WA].map((type) => ({
    key: type,
    value: type,
    text: VerdictFilterTypes.getProperties(type).text,
  }))
);

export namespace OIFilterForm {
  export interface Props {
    onQueryChange?(query?: string): void;
  }
  export interface Value {
    verdict?: VerdictFilterTypes;
    language?: string;
    score?: { operator: ComparisonOperator; value: number };
  }
}

export const OIFilterForm: React.FC<OIFilterForm.Props> = (props) => {
  const { onQueryChange } = props;

  const onSubmit = React.useCallback(
    (values: OIFilterForm.Value) => {
      let query = '';
      if (values.language && values.language !== 'ANY') {
        query = FilterUtils.joinAnd(
          query,
          `language${ComparisonOperator.EQUAL}${values.language}`
        );
      }
      if (values.verdict) {
        query = FilterUtils.joinAnd(
          query,
          VerdictFilterTypes.getProperties(values.verdict).query ?? ''
        );
      }
      if (values.score) {
        const { operator, value } = values.score;
        if (operator) {
          query = FilterUtils.joinAnd(
            query,
            `judge.result.score${operator}${Number(value) / 100}`
          );
        }
      }
      onQueryChange?.(query ? query : undefined);
    },
    [onQueryChange]
  );

  const { values, setFieldValue, handleSubmit } = useFormik<OIFilterForm.Value>(
    {
      initialValues: {
        verdict: undefined,
        language: undefined,
      },
      onSubmit,
    }
  );

  const handleChange = React.useCallback(
    (event, data) => {
      const { value, name } = data;
      setFieldValue(name, value);
    },
    [setFieldValue]
  );

  return (
    <Form error onSubmit={handleSubmit}>
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
