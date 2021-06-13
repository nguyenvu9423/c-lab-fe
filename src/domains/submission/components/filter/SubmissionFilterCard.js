import * as React from 'react';

import { useFormik } from 'formik';
import { Segment, Header, Form, Select, Label } from 'semantic-ui-react';
import { useProblemLanguageOptions } from './language-options';
import { useVerdictOptions } from './verdict-options';
import { useOperationOptions } from './operation-options';
import { ComparisonOperator } from '../../../../utility/filter';

export const SubmissionFilterCard = (props) => {
  const { problem, onQueryChange } = props;

  const { languageOptions } = useProblemLanguageOptions({ problem });
  const { verdictOptions, mapValueToVerdict } = useVerdictOptions();
  const { operationOptions, mapValueToOperation } = useOperationOptions();

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      verdict: verdictOptions[0].value,
      language: languageOptions[0].value,
      operation: operationOptions[0].value,
      testCount: 0,
    },
    onSubmit: (values) => {
      let query = '';
      if (values.language && values.language !== 'ANY') {
        query += `language${ComparisonOperator.EQUAL}${values.language}`;
      }
      if (values.verdict) {
        const verdict = mapValueToVerdict(values.verdict);
        query += verdict.query;
      }
      if (values.operation) {
        const operation = mapValueToOperation(values.operation);
        query += `result.passedTestCount${operation.operator}${values.testCount}`;
      }
      onQueryChange?.(query ? query : undefined);
    },
  });

  const handleChange = React.useCallback((event, data) => {
    const { value, name } = data;
    setFieldValue(name, value, true);
  }, []);

  if (!problem) return null;
  return (
    <>
      <Header as="h2" attached="top">
        Bộ lọc
      </Header>
      <Segment attached="bottom" clearing>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Kết quả</label>
            <Form.Select
              options={verdictOptions}
              value={values.verdict}
              name="verdict"
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Ngôn ngữ</label>
            <Form.Select
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
            <Form.Input
              fluid
              type="number"
              min={0}
              actionPosition="left"
              labelPosition="right"
              name="testCount"
              value={values.testCount}
              onChange={handleChange}
              onBlur={() => {
                if (!values.testCount && values.testCount !== 0) {
                  setFieldValue('testCount', 0);
                }
              }}
            >
              <Select
                compact
                options={operationOptions}
                name="operation"
                value={values.operation}
                onChange={handleChange}
              />
              <input />
              <Label basic>tests</Label>
            </Form.Input>
          </Form.Field>
          <Form.Button type="submit" floated="right">
            Lọc
          </Form.Button>
        </Form>
      </Segment>
    </>
  );
};
