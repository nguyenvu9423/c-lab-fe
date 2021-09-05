import * as React from 'react';
import { useFormik } from 'formik';

import { DropdownItemProps, Form, Input } from 'semantic-ui-react';
import { ComparisonOperator } from '../../../../utility/filter';
import { FilterUtils } from '../../../../utility/filter/utils';
import { VerdictFilterTypes } from './options';
import { languageOptions, operationOptions } from './shared';

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
    score?: { operator: ComparisonOperator; score: string };
  }
}

export const OIFilterForm: React.FC<OIFilterForm.Props> = (props) => {
  const { onQueryChange } = props;

  const onSubmit = React.useCallback(
    (values: OIFilterForm.Value) => {
      let query = '';
      console.log(values);
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
        const { operator, score } = values.score;
        if (operator) {
          query = FilterUtils.joinAnd(
            query,
            `judge.result.score${operator}${Number(score) / 100}`
          );
        }
      }
      console.log(query);
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
        <label>Verdict</label>
        <Form.Select
          placeholder="Result"
          options={verdictOptions}
          value={values.verdict}
          name="verdict"
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Language</label>
        <Form.Select
          placeholder="Language"
          options={languageOptions}
          value={values.language}
          name="language"
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Score</label>
      </Form.Field>
      <Form.Group widths={16}>
        <Form.Field width={6}>
          <Form.Select
            compact
            placeholder="=, <="
            options={operationOptions}
            name="operation"
            value={values.score?.operator}
            onChange={(event, { value }) => {
              if (value === undefined) {
                setFieldValue('score', undefined);
              } else {
                setFieldValue('score', {
                  operator: value,
                  score: values.score?.score ?? 0,
                });
              }
            }}
          />
        </Form.Field>
        <Form.Field width="10">
          <Input
            type="number"
            min="0"
            max="100"
            label="point"
            labelPosition="right"
            fluid
            disabled={!values.score}
            value={values.score?.score}
            onChange={(event, { value }) => {
              setFieldValue('score', {
                ...values.score,
                score: value,
              });
            }}
          />
        </Form.Field>
      </Form.Group>

      <Form.Button type="submit" floated="right">
        Filter
      </Form.Button>
    </Form>
  );
};
