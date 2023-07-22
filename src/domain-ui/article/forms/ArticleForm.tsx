import * as React from 'react';
import * as yup from 'yup';
import { Form, TextArea, Checkbox } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { RawDraftContentState } from 'draft-js';

import { ArticleStatus, articleStatusValues } from '@/domains/article';
import { SubmitButton, CancelButton } from '@/components/button';
import { Tag } from '@/domains/tag';
import { TagSelect } from '../../tag';

import { useErrorMessageRenderer, RichTextEditor } from '@/components';
import { ImageUploader } from '@/components/input';
import { FieldError } from '@/shared/exceptions';

export namespace ArticleForm {
  export interface Props {
    initialValues?: Partial<Value>;
    onSubmit?(value: Value): Promise<unknown>;
    onCancel?(): void;
    status?: { errors?: FieldError[] };
  }

  export interface Value {
    status: ArticleStatus;
    title: string;
    subtitle: string;
    overview: string;
    content: RawDraftContentState | undefined;
    thumbnail: string | File | undefined;
    contentTableShown: boolean;
    tags: Tag[];
  }
}

export const ArticleFormSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('Vui lòng điền tiêu đề')
    .min(3, 'Tiêu đề phải có ít nhất 3 kí tự')
    .max(255, 'Tiêu đề không được vượt quá 255 kí tự'),
  subtitle: yup
    .string()
    .trim()
    .max(255, 'Phụ đề không được vượt quá 255 kí tự'),
  overview: yup
    .string()
    .trim()
    .required('Vui lòng điền tổng quan')
    .max(1023, 'Tổng quan không được vượt quá 1023 kí tự'),
  tags: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        name: yup.string().trim().required(),
      }),
    )
    .required(),
}) as yup.Schema;

export const ArticleForm: React.FC<ArticleForm.Props> = (props) => {
  const { initialValues, onSubmit, onCancel } = props;

  const {
    values,
    setFieldValue,
    touched,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
  } = useFormik<ArticleForm.Value>({
    initialValues: {
      status: initialValues?.status ?? ArticleStatus.ACTIVE,
      title: initialValues?.title ?? '',
      subtitle: initialValues?.subtitle ?? '',
      overview: initialValues?.overview ?? '',
      content: initialValues?.content,
      thumbnail: initialValues?.thumbnail,
      contentTableShown: initialValues?.contentTableShown ?? true,
      tags: initialValues?.tags ?? [],
    },
    validationSchema: ArticleFormSchema,
    onSubmit: (value) => onSubmit?.(ArticleFormSchema.cast(value)),
  });

  const errorMessageRender = useErrorMessageRenderer({
    touched,
    errors,
    status: props.status,
  });

  console.log(errors);
  return (
    <Form
      className={'article clear-fix-container'}
      onSubmit={handleSubmit}
      error={true}
      loading={isSubmitting}
    >
      <Form.Group widths="equal">
        <Form.Field>
          <label>Tiêu đề*</label>
          <Form.Input
            type="text"
            name="title"
            value={values.title}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errorMessageRender('title')}
        </Form.Field>

        <Form.Field>
          <label>Trạng thái</label>
          <Form.Select
            name="status"
            options={statusOptions}
            value={values.status}
            onChange={(event, data) => {
              setFieldValue(data.name, data.value);
            }}
            onBlur={() => {
              setFieldTouched('status');
            }}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Phụ đề</label>
          <Form.Input
            type="text"
            name="subtitle"
            value={values.subtitle}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errorMessageRender('subtitle')}
        </Form.Field>
        <Form.Field>
          <label>Nhãn</label>
          <TagSelect
            value={values.tags}
            onChange={(value) => setFieldValue('tags', value)}
            onBlur={() => setFieldTouched('tags')}
          />
          {errorMessageRender('tags')}
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Nội dung</label>
        <RichTextEditor
          className="article-editor"
          initialValue={initialValues?.content}
          onChange={(value) => setFieldValue('content', value)}
        />
        {errorMessageRender('content')}
      </Form.Field>
      <Form.Group>
        <Form.Field width={8}>
          <label>Tổng quan*</label>
          <TextArea
            name="Tổng quan"
            rows={4}
            placeholder="Tổng quan về bài viết.."
            value={values.overview}
            onChange={(event, { value }) => setFieldValue('overview', value)}
            onBlur={() => setFieldTouched('overview')}
          />
          {errorMessageRender('overview')}
        </Form.Field>
        <Form.Field width={8}>
          <label>Mục lục</label>
          <Checkbox
            label="Hiển thị"
            checked={values.contentTableShown}
            onChange={() =>
              setFieldValue('contentTableShown', !values.contentTableShown)
            }
          />
        </Form.Field>
      </Form.Group>

      <Form.Field>
        <label>Thumbnail</label>
        <ImageUploader
          initialValue={initialValues?.thumbnail}
          value={values.thumbnail}
          onChange={(value) => setFieldValue('thumbnail', value)}
        />
      </Form.Field>

      <SubmitButton floated="right" disabled={isSubmitting} />
      {onCancel && <CancelButton floated="right" onClick={onCancel} />}
    </Form>
  );
};

const statusOptions = articleStatusValues.map((item) => {
  return {
    text: item,
    value: item,
  };
});
