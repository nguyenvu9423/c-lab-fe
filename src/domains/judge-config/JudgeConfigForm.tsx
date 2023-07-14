import * as React from 'react';
import * as yup from 'yup';
import { useFormik, FormikHelpers } from 'formik';
import { JudgerType, ScoringType } from './JudgeConfig';
import { useErrorMessageRenderer } from '../../components/form';
import { SubmitButton, CancelButton } from '../../components/button';
import {
  Form,
  Header,
  Divider,
  Button,
  Modal,
  Table,
  Icon,
} from 'semantic-ui-react';
import { PutFileInput } from '../../page/common/inputs/PutFileInput';
import { CustomJudger, TestPackage } from '.';
import { BackEndConfig } from '../../config';
import { TextFileOverviewContainer } from '../../components';

const judgerOptions = JudgerType.values.map((type) => ({
  value: type,
  text: type,
}));

const scoringTypeOptions = ScoringType.values.map((type) => ({
  value: type,
  text: type,
}));

export namespace JudgeConfigForm {
  export interface Props {
    initialValues?: Partial<Value>;
    onCancel?: () => void;
    onSubmit?: (value: Value, helpers: FormikHelpers<Value>) => void;
    embedded?: boolean;
  }

  export interface Value {
    timeLimit: number;
    memoryLimit: number;
    judgerType: JudgerType;
    scoringType: ScoringType;
    testPackage?: TestPackage | File;
    customJudger?: CustomJudger | File;
  }
}

export const JudgeConfigFormSchema = yup.object({
  timeLimit: yup
    .number()
    .required('Vui lòng điền giới hạn thời gian')
    .min(1, 'Giới hạn thời gian phải lớn hơn 0ms')
    .max(20000, 'Giới hạn thời gian không được quá 20000ms'),
  memoryLimit: yup
    .number()
    .required('Vui lòng điền giới hạn bộ nhớ ')
    .min(1, 'Giới hạn bộ nhớ phải lớn hơn 0mb')
    .max(1024, 'Giới hạn bộ nhớ không được quá 1024mb'),
  customJudger: yup.mixed().when('judgerType', {
    is: JudgerType.Custom,
    then: yup.mixed().required('Vui lòng tải lên trình chấm'),
  }),
  testPackage: yup.mixed().required('Vui lòng tải lên bộ test'),
});

export const JudgeConfigForm: React.FC<JudgeConfigForm.Props> = (props) => {
  const { initialValues, onSubmit, onCancel, embedded } = props;

  const mergedInitialValues = React.useMemo(
    () => ({
      timeLimit: initialValues?.timeLimit ?? 2000,
      memoryLimit: initialValues?.memoryLimit ?? 256,
      judgerType: initialValues?.judgerType ?? JudgerType.LinesWordsCase,
      scoringType: initialValues?.scoringType ?? ScoringType.ACM,
      testPackage: initialValues?.testPackage,
      customJudger: initialValues?.customJudger,
    }),
    [initialValues]
  );

  const {
    values,
    touched,
    errors,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik<JudgeConfigForm.Value>({
    initialValues: mergedInitialValues,
    validationSchema: JudgeConfigFormSchema,
    onSubmit: (values, helpers) => onSubmit?.(values, helpers),
  });

  const handleTestPackageChange = React.useCallback((file) => {
    setFieldValue('testPackage', file);
  }, []);

  const handleCustomJudgerChange = React.useCallback((file) => {
    setFieldValue('customJudger', file);
  }, []);

  const errorMessageRenderer = useErrorMessageRenderer({ touched, errors });

  return (
    <Form
      error={true}
      onSubmit={() => {
        handleSubmit();
      }}
      className={'article clear-fix-container'}
      loading={isSubmitting}
    >
      <Divider horizontal>
        <Header as="h4">Máy chấm</Header>
      </Divider>
      <Form.Group>
        <Form.Field width={8}>
          <label>Kiểu chấm</label>
          <Form.Select
            compact
            name="judger"
            value={values.judgerType}
            options={judgerOptions}
            onChange={(e, { value }) => setFieldValue('judgerType', value)}
          />
        </Form.Field>
        <Form.Field width={8}>
          <label>Kiểu chấm điểm</label>
          <Form.Select
            value={values.scoringType}
            options={scoringTypeOptions}
            onBlur={handleBlur}
            onChange={(e, { value }) => setFieldValue('scoringType', value)}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Giới hạn thời gian (ms)</label>
          <Form.Input
            type="number"
            name="timeLimit"
            value={values.timeLimit}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errorMessageRenderer('timeLimit')}
        </Form.Field>
        <Form.Field>
          <label>Giới hạn bộ nhớ (mb)</label>
          <Form.Input
            type="number"
            name="memoryLimit"
            value={values.memoryLimit}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errorMessageRenderer('memoryLimit')}
        </Form.Field>
      </Form.Group>

      {values.judgerType === JudgerType.Custom && (
        <Form.Field width={8}>
          <label>Trình chấm tự chọn</label>
          <PutFileInput
            file={
              values.customJudger
                ? values.customJudger instanceof File
                  ? values.customJudger
                  : {
                      name: values.customJudger.originalFileName,
                      uploaded: true,
                      downloadLink: `/api/custom-judger/${values.customJudger.id}/file`,
                    }
                : undefined
            }
            onChange={handleCustomJudgerChange}
          />
          {errorMessageRenderer('customJudger')}
        </Form.Field>
      )}
      <Divider horizontal>
        <Header as="h4">Tập tests</Header>
      </Divider>
      <Form.Group>
        <Form.Field width={8}>
          <label>Zip file</label>
          <PutFileInput
            file={
              values.testPackage
                ? values.testPackage instanceof File
                  ? values.testPackage
                  : {
                      name: values.testPackage.originalFileName,
                      uploaded: true,
                      downloadLink: `${BackEndConfig.API_URL}/test-package/${values.testPackage.id}/file`,
                    }
                : undefined
            }
            onChange={handleTestPackageChange}
          />
          {values.testPackage && !(values.testPackage instanceof File) && (
            <TestPackageZoomButton testPackage={values.testPackage} />
          )}
          {errorMessageRenderer('testPackage')}
        </Form.Field>
      </Form.Group>

      {embedded ? (
        <input type="submit" style={{ display: 'none' }} />
      ) : (
        <>
          <SubmitButton floated="right" />
          {onCancel && <CancelButton floated="right" onClick={onCancel} />}
        </>
      )}
    </Form>
  );
};

export const TestPackageZoomButton: React.FC<{ testPackage: TestPackage }> = (
  props
) => {
  const { testPackage } = props;
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Button type="button" icon="zoom" onClick={() => setOpen(true)} />
      {open && (
        <TestPackageModal
          key={testPackage.id}
          testPackage={testPackage}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export const TestPackageModal: React.FC<{
  testPackage: TestPackage;
  onClose: () => void;
}> = (props) => {
  const { testPackage, onClose } = props;

  const sortedTests = React.useMemo(() => {
    return [...testPackage.tests].sort((a, b) => a.id - b.id);
  }, [testPackage.tests]);

  const [expansionMap, setExpansionMap] = React.useState<
    Record<number, boolean>
  >(
    testPackage.tests.reduce((res, test) => {
      res[test.id] = false;
      return res;
    }, {})
  );

  const isAllExpanded = React.useMemo(
    () => Object.values(expansionMap).every((item) => item == true),
    [expansionMap]
  );

  const toggleAll = React.useCallback((expand: boolean) => {
    setExpansionMap((map) => {
      const newMap = { ...map };
      for (const key in newMap) {
        newMap[key] = expand;
      }
      return newMap;
    });
  }, []);

  const toggleTest = React.useCallback((testId) => {
    setExpansionMap((map) => ({ ...map, [testId]: !map[testId] }));
  }, []);

  return (
    <Modal open closeIcon onClose={onClose}>
      <Modal.Header>
        Gói tests: {testPackage.originalFileName}
        <Button
          icon
          floated="right"
          labelPosition="left"
          onClick={() => toggleAll(!isAllExpanded)}
        >
          <Icon name={isAllExpanded ? 'caret up' : 'caret down'} />
          Mở tất cả
        </Button>
      </Modal.Header>
      <Modal.Content scrolling style={{ maxHeight: 520 }}>
        <Table fixed>
          <Table.Header>
            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
            <Table.HeaderCell>Input path</Table.HeaderCell>
            <Table.HeaderCell>Output Path</Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {sortedTests.map((test) => (
              <Table.Row
                key={test.id}
                verticalAlign="top"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleTest(test.id)}
              >
                <Table.Cell>{test.id}</Table.Cell>
                <Table.Cell>
                  {test.input.path}
                  {expansionMap[test.id] && (
                    <TextFileOverviewContainer>
                      {test.input.overview}
                    </TextFileOverviewContainer>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {test.output.path}
                  {expansionMap[test.id] && (
                    <TextFileOverviewContainer>
                      {test.output.overview}
                    </TextFileOverviewContainer>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button type="button" onClick={onClose}>
          Thoát
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
