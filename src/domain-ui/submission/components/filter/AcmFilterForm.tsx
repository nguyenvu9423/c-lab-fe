import * as React from 'react';

import { useFormik } from 'formik';
import { Form } from 'semantic-ui-react';
import { VerdictFilterTypes } from './options';

import { languageOptions } from './shared';
import { ValuePredicateInput } from './ValuePredicateInput';
import { RsqlUtils } from '../../../../utils';
import { ComparisonOperator, ExpressionNode } from '@rsql/ast';

const verdictOptions: { value?: string; text: string }[] = [
  { key: '', text: '' },
].concat(
  VerdictFilterTypes.values.map((type) => ({
    key: type,
    value: type,
    text: VerdictFilterTypes.getProperties(type).text,
  }))
);

export namespace AcmFilterForm {
  export interface Props {
    onQueryChange?(query: string | undefined): void;
  }

  export interface Value {
    verdict?: VerdictFilterTypes;
    language?: string;
    passedTestCount?: { operator: ComparisonOperator; value: number };
  }
}

export const AcmFilterForm: React.FC<AcmFilterForm.Props> = (props) => {
  const { onQueryChange } = props;

  const onSubmit = React.useCallback(
    (values: AcmFilterForm.Value) => {
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

      if (values.passedTestCount) {
        const { operator, value } = values.passedTestCount;
        predicates.push(
          RsqlUtils.Builder.comparison(
            'judge.result.passedTestCount',
            operator,
            value
          )
        );
      }
      if (predicates.length > 0) {
        const andPredicates = RsqlUtils.Builder.and(...predicates);
        onQueryChange?.(RsqlUtils.emit(andPredicates));
      } else {
        onQueryChange?.(undefined);
      }
    },
    [onQueryChange]
  );

  const { values, setFieldValue, handleSubmit } =
    useFormik<AcmFilterForm.Value>({
      initialValues: {},
      onSubmit,
    });

  const handleChange = React.useCallback(
    (event, data) => {
      const { value, name } = data;
      setFieldValue(name, value);
    },
    [setFieldValue]
  );

  return (
    <Form onSubmit={handleSubmit}>
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
