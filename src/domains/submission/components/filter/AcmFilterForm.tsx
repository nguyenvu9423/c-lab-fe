import * as React from 'react';

import { useFormik } from 'formik';
import { Form, Input } from 'semantic-ui-react';
import { VerdictFilterTypes } from './options';
import { ComparisonOperator } from '../../../../utility/filter';

import { languageOptions, operationOptions } from './shared';
import { FilterUtils } from '../../../../utility/filter/utils';

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
    passedTestCount?: { operator: ComparisonOperator; testCount: string };
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
        const { operator, testCount } = values.passedTestCount;
        query = FilterUtils.joinAnd(
          query,
          `judge.result.passedTestCount${operator}${testCount}`
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
        <label>Number of tests passed</label>
      </Form.Field>
      <Form.Group widths={16}>
        <Form.Field width={6}>
          <Form.Select
            name="operation"
            placeholder="=, <="
            compact
            options={operationOptions}
            value={values.passedTestCount?.operator}
            onChange={(event, { value }) => {
              if (value === undefined) {
                setFieldValue('passedTestCount', undefined);
              } else {
                setFieldValue('passedTestCount', {
                  operator: value,
                  testCount: values.passedTestCount?.testCount ?? 0,
                });
              }
            }}
          />
        </Form.Field>
        <Form.Field width={10}>
          <Input
            name="testCount"
            type="number"
            min={0}
            fluid
            label="tests"
            labelPosition="right"
            disabled={!values.passedTestCount}
            value={values.passedTestCount?.testCount}
            onChange={(event, { value }) => {
              setFieldValue('passedTestCount', {
                ...values.passedTestCount,
                testCount: value,
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
