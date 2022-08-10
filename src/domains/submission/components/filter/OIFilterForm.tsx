import * as React from 'react';
import { useFormik } from 'formik';

import { DropdownItemProps, Form } from 'semantic-ui-react';
import { VerdictFilterTypes } from './options';
import { languageOptions } from './shared';
import { ValuePredicateInput } from './ValuePredicateInput';
import { ComparisonOperator, ExpressionNode } from '@rsql/ast';
import { RsqlUtils } from '../../../../utility';

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
      const predicates: ExpressionNode[] = [];

      if (values.language && values.language !== 'ANY') {
        predicates.push(RsqlUtils.Builder.eq('language', values.language));
      }

      if (values.verdict) {
        const filterProps = VerdictFilterTypes.getProperties(values.verdict);
        if (filterProps.rsqlNode) {
          predicates.push(filterProps.rsqlNode);
        }
      }
      if (values.score) {
        const { operator, value } = values.score;
        predicates.push(
          RsqlUtils.Builder.comparison(
            'judge.result.score',
            operator,
            Number(value) / 100
          )
        );
      }

      const query =
        predicates.length > 0
          ? RsqlUtils.emit(RsqlUtils.Builder.and(...predicates))
          : undefined;

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
