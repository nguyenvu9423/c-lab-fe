import React from 'react';
import { Dimmer, Form, Input, Loader } from 'semantic-ui-react';
import { FormikHelpers, useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { RawDraftContentState } from 'react-draft-wysiwyg';
import { SubmitButton } from '@/components/button';
import { RichTextEditor } from '@/components/editors';
import { useErrorMessageRenderer } from '@/components/form';

export namespace ContestForm {
  export interface Props {
    initialValue?: Partial<Value>;
    onSubmit?: (data: Value, helpers: FormikHelpers<unknown>) => void;
    onCancel?: () => void;
  }

  export interface Value {
    name: string;
    description: string;
    start: Date;
    duration: number;
  }
}

export const ContestForm: React.FC<ContestForm.Props> = (props) => {
  const { initialValue, onSubmit } = props;

  const {
    values,
    touched,
    errors,
    isSubmitting,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik<InternalValue>({
    initialValues: {
      name: initialValue?.name ?? '',
      description: initialValue?.description
        ? JSON.parse(initialValue.description)
        : undefined,
      start: initialValue?.start ?? moment().add(30, 'minute').toDate(),
      duration: initialValue?.duration ?? 120,
    },
    validationSchema: ContestFormSchema,
    onSubmit: (value, helpers) => {
      const submittedValue = {
        ...value,
        description: JSON.stringify(value.description),
      };

      return onSubmit?.(submittedValue, helpers);
    },
  });
  const errorMessageRenderer = useErrorMessageRenderer({ touched, errors });

  return (
    <Dimmer.Dimmable dimmed={isSubmitting}>
      <Form widths="equal" onSubmit={handleSubmit} error={true}>
        <Form.Field>
          <label>Tên</label>
          <Form.Input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRenderer('name')}
        </Form.Field>

        <Form.Group>
          <Form.Field>
            <label>Bắt đầu</label>
            <input
              type="datetime-local"
              name="start"
              value={moment(values.start).format(DATE_TIME_FORMAT)}
              onChange={({ target }) =>
                setFieldValue('start', new Date(target.value))
              }
            />
            {errorMessageRenderer('start')}
          </Form.Field>
          <Form.Field>
            <label>Khoảng thời gian</label>
            <Input
              type="number"
              name="duration"
              value={values.duration}
              onChange={handleChange}
              onBlur={handleBlur}
              label="phút"
              labelPosition="right"
            />
            {errorMessageRenderer('duration')}
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>Giới thiệu</label>
          <RichTextEditor
            className="contest-editor"
            initialValue={values.description}
            onChange={(value) => setFieldValue('description', value)}
          />
        </Form.Field>
        <SubmitButton floated="right" />
        <Dimmer inverted active={isSubmitting}>
          <Loader />
        </Dimmer>
      </Form>
    </Dimmer.Dimmable>
  );
};

interface InternalValue {
  name: string;
  description: RawDraftContentState | undefined;
  start: Date;
  duration: number;
}

const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

const ContestFormSchema = yup.object({
  name: yup
    .string()
    .required('Vui lòng điền tên kì thi')
    .min(3, 'Tên kì thi phải chưa ít nhất 3 kí tự')
    .max(128, 'Tên kì thi không được chứa nhiều hơn 128 kí tự')
    .trim(),
  start: yup.date().required(),
  duration: yup
    .number()
    .required('Vui lòng điền thời gian')
    .integer()
    .min(15, 'Thời gian thi ít nhất 15 phút'),
});
