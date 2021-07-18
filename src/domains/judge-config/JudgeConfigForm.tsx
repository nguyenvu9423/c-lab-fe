import * as React from 'react';
import * as yup from 'yup';
import { useFormik, FormikHelpers } from 'formik';
import {
  JudgerType,
  ScoringType,
  CustomJudger,
  TestPackage,
} from './JudgeConfig';
import { useErrorMessageRenderer } from '../../components/form';
import { SubmitButton, CancelButton } from '../../components/button';
import { Form, Header, Divider } from 'semantic-ui-react';
import { PutFileInput } from '../../page/common/inputs/PutFileInput';

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
    .required('Time limit should be defined')
    .min(1, 'Timelimit should be greater than 0ms')
    .max(20000, 'Timelimit shoud be less than 20000ms'),
  memoryLimit: yup
    .number()
    .required('Memory limit should be defined')
    .min(1, 'Memorylimit should be greater than 32mb')
    .max(1024, 'Memorylimit should be less than 1024mb'),
  customJudger: yup.mixed().when('judgerType', {
    is: JudgerType.Custom,
    then: yup.mixed().required('Custom judger is required'),
  }),
  testPackage: yup.mixed().required('Test package is required'),
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
        <Header as="h4">Judger</Header>
      </Divider>
      <Form.Group>
        <Form.Field width={8}>
          <label>Type</label>
          <Form.Select
            compact
            name="judger"
            value={values.judgerType}
            options={judgerOptions}
            onChange={(e, { value }) => setFieldValue('judgerType', value)}
          />
        </Form.Field>
        <Form.Field width={8}>
          <label>Scoring type</label>
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
          <label>Time limit (ms)</label>
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
          <label>Memory limit (mb)</label>
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
          <label>Custom judger</label>
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
        <Header as="h4">Test package</Header>
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
                      downloadLink: `/api/test-package/${values.testPackage.id}/file`,
                    }
                : undefined
            }
            onChange={handleTestPackageChange}
          />
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
