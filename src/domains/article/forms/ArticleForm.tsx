import * as React from 'react';
import * as yup from 'yup';
import { Form, TextArea, Checkbox } from 'semantic-ui-react';
import { useFormik } from 'formik';

import { ArticleStatus } from '../';
import { TagSelect, Tag } from '../../tag';
import { SubmitButton, CancelButton } from '../../../components/button';
import {
  useErrorMessageRenderer,
  MarkdownEditor,
  RichTextEditor,
} from '../../../components';
import { articleStatusValues } from '../ArticleStatus';
import { FieldError } from '../../../exception';
import { ImageUploader } from '../../../components/input';
import { convertToRaw, RawDraftContentState } from 'draft-js';

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
    .required('Title is required')
    .min(3, 'Title should be at last 3 characters'),
  subtitle: yup.string().trim(),
  overview: yup.string().trim().required('Overview is required'),
  tags: yup.array().max(5),
}) as yup.SchemaOf<any>;

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
            onBlur={handleBlur}
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
