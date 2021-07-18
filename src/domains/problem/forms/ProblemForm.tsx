import * as React from 'react';
import * as yup from 'yup';
import { Dimmer, Form, Loader } from 'semantic-ui-react';
import { MarkdownEditor, useErrorMessageRenderer } from '../../../components';
import { SubmissionLangSelect } from '../../submission-lang';
import { TagSelect, Tag } from '../../tag';
import { SubmitButton, CancelButton } from '../../../components/button';
import { useFormik, FormikHelpers } from 'formik';
import { SubmissionLanguage } from '../../submission-lang/SubmissionLanguage';

export namespace ProblemForm {
  export interface Props {
    isCodeEditable?: boolean;
    initialValues?: Partial<Value>;
    onSubmit?: (value: Value, helpers: FormikHelpers<Value>) => void;
    onCancel?: () => void;
  }
  export interface Value {
    code: string;
    title: string;
    definition: string;
    tags: Tag[];
    allowedLanguages: SubmissionLanguage[];
  }
}

const ProblemFormSchema = yup.object({
  code: yup
    .string()
    .required('Code is required')
    .matches(
      /^[A-Z0-9]*$/,
      'Code should only contain uppercase letters and numbers'
    )
    .min(3, 'Code should be at least 3 characters')
    .max(12, 'Code shoud be at most 12 characters'),
  title: yup
    .string()
    .trim()
    .required('Title is required')
    .min(3, 'Title should be at least 3 characters')
    .max(64, 'Title should be at most 64 characters'),
  definition: yup
    .string()
    .max(640000, 'Definition should only contain 64000 characters'),
  allowedLanguages: yup
    .array()
    .min(1, 'At least one languages should be defined'),
});

export const ProblemForm: React.FC<ProblemForm.Props> = (props) => {
  const { initialValues, onSubmit, onCancel } = props;

  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik<ProblemForm.Value>({
    initialValues: {
      code: initialValues?.code ?? '',
      title: initialValues?.title ?? '',
      definition: initialValues?.definition ?? '',
      allowedLanguages: initialValues?.allowedLanguages ?? [],
      tags: initialValues?.tags ?? [],
    },
    validationSchema: ProblemFormSchema,
    onSubmit: (value, helpers) => onSubmit?.(value, helpers),
  });

  const handleCodeChange = React.useCallback((event, data) => {
    setFieldValue('code', data.value.toUpperCase());
  }, []);

  const errorMessageRenderer = useErrorMessageRenderer({ touched, errors });
  return (
    <Dimmer.Dimmable dimmed={isSubmitting}>
      <Form onSubmit={handleSubmit} error={true}>
        <Form.Group widths="equal">
          {props.isCodeEditable && (
            <Form.Field>
              <label>Code</label>
              <Form.Input
                type="text"
                name="code"
                value={values.code}
                onBlur={handleBlur}
                onChange={handleCodeChange}
              />
              {errorMessageRenderer('code')}
            </Form.Field>
          )}
          <Form.Field>
            <label>Tiêu đề</label>
            <Form.Input
              type="text"
              name="title"
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errorMessageRenderer('title')}
          </Form.Field>
        </Form.Group>

        <Form.Field>
          <label>Đề bài</label>
          <MarkdownEditor
            className="problem-editor"
            initialValue={initialValues?.definition ?? ''}
            onChange={(content) => setFieldValue('definition', content)}
          />
          {errorMessageRenderer('definition')}
        </Form.Field>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Ngôn ngữ cho phép</label>
            <SubmissionLangSelect
              value={values.allowedLanguages}
              onChange={(value) => {
                setFieldValue('allowedLanguages', value);
              }}
              onBlur={() => setFieldTouched('allowedLanguages', true)}
            />
            {errorMessageRenderer('allowedLanguages')}
          </Form.Field>
          <Form.Field>
            <label>Tags</label>
            <TagSelect
              value={values.tags}
              onChange={(value) => setFieldValue('tags', value)}
            />
          </Form.Field>
        </Form.Group>
      </Form>

      <SubmitButton type="button" floated="right" onClick={handleSubmit} />
      {onCancel && <CancelButton floated="right" onClick={onCancel} />}

      <Dimmer inverted active={isSubmitting}>
        <Loader />
      </Dimmer>
    </Dimmer.Dimmable>
  );
};
