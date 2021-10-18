import * as React from 'react';
import * as yup from 'yup';
import { Dimmer, Form, Loader } from 'semantic-ui-react';
import { MarkdownEditor, useErrorMessageRenderer } from '../../../components';
import { TagSelect, Tag } from '../../tag';
import { SubmitButton, CancelButton } from '../../../components/button';
import { useFormik, FormikHelpers } from 'formik';
import {
  SubmissionLanguage,
  SubmissionLangMultiSelect,
} from '../../submission-lang';

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
    .required('Vui lòng điền mã bài')
    .matches(/^[A-Z0-9]*$/, 'Mã bài chỉ có thể chứa chữ hoa hoặc số')
    .min(3, 'Mã bài phải có ít nhất 3 kí tự')
    .max(12, 'Mã bài không được vuợt quá 12 kí tự'),
  title: yup
    .string()
    .trim()
    .required('Vui lòng điền tiêu đề')
    .min(3, 'Tiêu đề phải có ít nhất 3 kí tự')
    .max(64, 'Tiêu đề không được vượt quá 64 kí tự'),
  definition: yup
    .string()
    .max(640000, 'Đề bài không được vượt quá 64000 kí tự'),
  allowedLanguages: yup.array().min(1, 'Vui lòng chọn ít nhất 1 ngôn ngữ'),
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
      <Form
        className="clear-fix-container"
        onSubmit={handleSubmit}
        error={true}
      >
        <Form.Group widths="equal">
          {props.isCodeEditable && (
            <Form.Field>
              <label>Mã bài</label>
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
            <SubmissionLangMultiSelect
              value={values.allowedLanguages}
              onChange={(value) => {
                setFieldValue('allowedLanguages', value);
              }}
              onBlur={() => setFieldTouched('allowedLanguages', true)}
            />
            {errorMessageRenderer('allowedLanguages')}
          </Form.Field>
          <Form.Field>
            <label>Nhãn</label>
            <TagSelect
              value={values.tags}
              onChange={(value) => setFieldValue('tags', value)}
            />
          </Form.Field>
        </Form.Group>
        <SubmitButton floated="right" />
        {onCancel && <CancelButton floated="right" onClick={onCancel} />}
      </Form>

      <Dimmer inverted active={isSubmitting}>
        <Loader />
      </Dimmer>
    </Dimmer.Dimmable>
  );
};
