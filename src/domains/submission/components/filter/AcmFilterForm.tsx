import * as React from 'react';

import { useFormik } from 'formik';
import { Form } from 'semantic-ui-react';
import { VerdictFilterTypes } from './options';
import { ComparisonOperator } from '../../../../utility/filter';

import { languageOptions } from './shared';
import { FilterUtils } from '../../../../utility/filter/utils';
import { ValuePredicateInput } from './ValuePredicateInput';

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

      if (values.passedTestCount) {
        const { operator, value } = values.passedTestCount;
        query = FilterUtils.joinAnd(
          query,
          `judge.result.passedTestCount${operator}${value}`
        );
      }

      onQueryChange?.(query ? query : undefined);
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
