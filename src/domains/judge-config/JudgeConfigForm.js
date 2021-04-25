import * as React from 'react';
import { useFormik } from 'formik';
import { JudgerType, judgerOptions } from './types';
import { useErrorMessageRenderer } from '../../components/form';
import { JudgeConfigValidation } from './validation';
import { SubmitButton, CancelButton } from '../../components/button';
import { Form, Header, Divider } from 'semantic-ui-react';
import { PutFileInput } from '../../page/common/inputs/PutFileInput';

export function JudgeConfigForm(props) {
  const { initialValues = {}, onSubmit, onCancel, embedded } = props;

  const mergedInitialValues = React.useMemo(
    () => ({
      id: initialValues?.id,
      judgerType: initialValues?.judgerType ?? JudgerType.LINES_WORDS_CASE,
      scoringType: initialValues?.scoringType ?? 'ACM',
      testPackage: initialValues?.testPackage,
      customJudger: initialValues?.customJudger,
      testPackageFile: undefined,
      customJudgerFile: undefined
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
    handleBlur
  } = useFormik({
    initialValues: mergedInitialValues,
    validationSchema: JudgeConfigValidation.schema,
    onSubmit: values => onSubmit?.(values)
  });

  const handleTestPackageChange = React.useCallback(file => {
    setFieldValue('testPackageFile', file);
  }, []);

  const handleCustomJudgerChange = React.useCallback(file => {
    setFieldValue('customJudgerFile', file);
  }, []);

  const errorMessageRenderer = useErrorMessageRenderer({
    touched,
    errors,
    status
  });

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
            options={[
              { text: 'ACM', value: 'ACM' },
              { text: 'OI', value: 'OI' }
            ]}
            onBlur={handleBlur}
            onChange={(e, { value }) => setFieldValue('scoringType', value)}
          />
        </Form.Field>
      </Form.Group>

      {values.judgerType === JudgerType.CUSTOM && (
        <Form.Field width={8}>
          <label>Custom judger</label>
          <PutFileInput
            file={
              values.customJudgerFile
                ? { name: values.customJudgerFile.name }
                : values.customJudger
                ? {
                    name: values.customJudger.originalFileName,
                    uploaded: true,
                    downloadLink: `/api/custom-judger/${values.customJudger.id}/file`
                  }
                : undefined
            }
            onChange={handleCustomJudgerChange}
          />
          {errorMessageRenderer('customJudgerFile')}
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
              values.testPackageFile
                ? {
                    name: values.testPackageFile.name
                  }
                : values.testPackage
                ? {
                    name: values.testPackage.originalFileName,
                    uploaded: true,
                    downloadLink: `/api/test-package/${values.testPackage.id}/file`
                  }
                : undefined
            }
            onChange={handleTestPackageChange}
          />
          {errorMessageRenderer('testPackageFile')}
        </Form.Field>
      </Form.Group>

      {embedded ? (
        <input type="submit" style={{ display: 'none' }} />
      ) : (
        <>
          <SubmitButton floated="right" />
          <CancelButton floated="right" onClick={onCancel} />
        </>
      )}
    </Form>
  );
}
