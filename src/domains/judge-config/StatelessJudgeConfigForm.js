import * as React from 'react';

import { Form } from 'semantic-ui-react';
import { Judger, judgerOptions } from './types';
import { FileUploadInput } from '../../page/common/inputs/FileUploadInput';
import { SubmitButton, CancelButton } from '../../components/button';

export function StatelessJudgeConfigForm(props) {
  const {
    values,
    setFieldValue,
    isSubmitting,
    handleExternalJudgerChange,
    errorMessageRenderer,
    handleTestPackageChange,
    handleChange,
    handleBlur,
    handleSubmit,
    onCancel,
    embedded
  } = props;

  const isJudgerExternal = values.judger === Judger.EXTERNAL;
  return (
    <Form
      error={true}
      onSubmit={handleSubmit}
      className={'article clear-fix-container'}
      loading={isSubmitting}
    >
      <Form.Group>
        <Form.Field width={8}>
          <label>Judger</label>
          <Form.Select
            compact
            name={'judger'}
            value={values.judger}
            options={judgerOptions}
            onChange={(e, { value }) => setFieldValue('judger', value)}
          />
        </Form.Field>
        {isJudgerExternal && (
          <Form.Field width={8}>
            <label>External executable judger</label>
            <FileUploadInput
              onChange={handleExternalJudgerChange}
              file={values.externalJudger}
            />
            {errorMessageRenderer('externalJudger')}
          </Form.Field>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Field width={8}>
          <label>Testcases</label>
          <FileUploadInput
            onChange={handleTestPackageChange}
            file={values.testPackageFile}
          />
          {errorMessageRenderer('testPackageFile')}
        </Form.Field>
        <Form.Field width={isJudgerExternal ? 8 : 4}>
          <Form.Input
            label="Input File Name"
            type="text"
            name="inputFileName"
            value={values.inputFileName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRenderer('inputFileName')}
        </Form.Field>
        {!isJudgerExternal && (
          <Form.Field width={4}>
            <Form.Input
              label="Output File Name"
              type="text"
              name="outputFileName"
              value={values.outputFileName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errorMessageRenderer('outputFileName')}
          </Form.Field>
        )}
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
