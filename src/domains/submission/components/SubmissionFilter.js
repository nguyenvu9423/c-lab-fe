import * as React from 'react';
import { Segment, Header, Form, Select, Label } from 'semantic-ui-react';
import { ProblemSelectors } from '../../../store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { VerdictTypes } from './VerdictTypes';
import { useFormik } from 'formik';
import { setSubmissionFilter } from '../../../store/actions/submissionFilter';

export const SubmissionFilter = props => {
  const dispatch = useDispatch();

  const { problemId } = props;
  const problem = useSelector(ProblemSelectors.byId(problemId));
  const languageOptions = React.useMemo(() => {
    if (problem) {
      const options = problem.allowedLanguages.map(lang => ({
        text: lang.title,
        value: lang.id,
        fieldvalue: lang
      }));
      options.unshift({ text: 'Any', value: 0, fieldvalue: { id: 0 } });
      return options;
    }
    return [];
  }, problem);

  const verdictOptions = React.useMemo(() => {
    return VerdictTypes.map(item => ({
      text: item.title,
      value: item.id,
      fieldvalue: item
    }));
  }, []);

  const operationOptions = React.useMemo(() => {
    return operationTypes.map(({ title, operation }) => ({
      text: title,
      value: operation.id,
      fieldvalue: operation
    }));
  }, []);

  const { values, setFieldValue, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      verdict: verdictOptions[0].fieldvalue,
      usedLanguage:
        languageOptions.length > 0 ? languageOptions[0].fieldvalue : undefined,
      operation: operationOptions[0].fieldvalue,
      testCount: 0
    },
    onSubmit: (values, bag) => {
      bag.setSubmitting(true);
      const { verdict, usedLanguage, operation, testCount } = values;
      const filters = [...verdict.filters];
      if (usedLanguage && usedLanguage.id) {
        filters.push({
          key: 'usedLanguage',
          operation: ':',
          value: usedLanguage.id
        });
      }
      if (operation && operation.id) {
        filters.push({
          key: 'passedTestCount',
          operation: ':',
          value: testCount
        });
      }
      dispatch(
        setSubmissionFilter({
          filters
        })
      );
      bag.setSubmitting(false);
    }
  });

  const handleSelectionChange = React.useCallback(
    (event, data) => {
      const { value, options, name } = data;
      const option = options.find(option => option.value == value);
      setFieldValue(name, option.fieldvalue);
    },
    [setFieldValue]
  );

  if (!problem) return null;
  return (
    <>
      <Header as="h2" attached="top">
        Bộ lọc
      </Header>
      <Segment attached="bottom">
        <Form
          className="clear-fix-container"
          onSubmit={handleSubmit}
          loading={isSubmitting}
        >
          <Form.Field>
            <label>Kết quả</label>
            <Form.Select
              options={verdictOptions}
              value={values.verdict.id}
              name="verdict"
              onChange={handleSelectionChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Ngôn ngữ</label>
            <Form.Select
              options={languageOptions}
              value={values.usedLanguage.id}
              name="usedLanguage"
              onChange={handleSelectionChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Số test đúng</label>
          </Form.Field>
          <Form.Field>
            <Form.Input
              fluid
              type="number"
              actionPosition="left"
              labelPosition="right"
              value={values.testCount}
              onChange={(event, data) => {
                setFieldValue('testCount', data.value);
              }}
            >
              <Select
                compact
                options={operationOptions}
                name="operation"
                value={values.operation.id}
                onChange={handleSelectionChange}
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

const operationTypes = [
  {
    title: '<>',
    operation: {
      operator: undefined
    }
  },
  {
    title: '=',
    operation: { operator: ':' }
  },
  {
    title: '<=',
    operation: { operator: '<=' }
  },
  {
    title: '>=',
    operation: { operator: '<=' }
  }
].map((item, id) => ({ ...item, operation: { id, ...item.operation } }));
