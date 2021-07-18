import * as React from 'react';
import * as yup from 'yup';

import { Button, Form, Segment, TextArea, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import DefaultThumbnail from '../../../../public/images/default-thumbnail.png';
import { ArticleStatus } from '../';
import { TagSelect, Tag } from '../../tag';
import { SubmitButton, CancelButton } from '../../../components/button';
import { useErrorMessageRenderer, RichTextEditor } from '../../../components';
import { articleStatusValues } from '../ArticleStatus';
import { FieldError } from '../../../exception';

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
    content: string;
    thumbnail: string | File | undefined;
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
}) as yup.Schema<any>;

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
      content: initialValues?.content ?? '',
      thumbnail: initialValues?.thumbnail,
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
          <label>Title*</label>
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
          <label>Status</label>
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
          <label>Subtitle</label>
          <Form.Input
            type="text"
            name="subtitle"
            value={values.subtitle}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Field>
          <label>Tags</label>
          <TagSelect
            value={values.tags}
            onChange={(value) => setFieldValue('tags', value)}
            onBlur={() => setFieldTouched('tags')}
          />
          {errorMessageRender('tags')}
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Content</label>
        <RichTextEditor
          className="article-editor"
          initialValue={initialValues?.content}
          onChange={(value) => setFieldValue('content', value)}
        />
        {errorMessageRender('content')}
      </Form.Field>
      <Form.Field>
        <label>Overview*</label>
        <Form.Field>
          <TextArea
            name="overview"
            rows={4}
            placeholder="Brief description about the article..."
            value={values.overview}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        {errorMessageRender('overview')}
      </Form.Field>
      <Form.Field>
        <label>Thumbnail</label>
        <ImageUploader
          value={values.thumbnail}
          onChange={(value) => setFieldValue('thumbnail', value)}
        />
      </Form.Field>

      <SubmitButton floated="right" disabled={isSubmitting} />
      <CancelButton floated="right" onClick={() => onCancel?.()} />
    </Form>
  );
};

const statusOptions = articleStatusValues.map((item) => {
  return {
    text: item,
    value: item,
  };
});

export const ImageUploader: React.FC<{
  value?: string | File | undefined;
  onChange?: (value: string | File) => void;
}> = (props) => {
  const { value } = props;

  const url = React.useMemo(
    () =>
      value
        ? value instanceof File
          ? URL.createObjectURL(value)
          : '/api' + value
        : undefined,
    [value]
  );

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  return (
    <div style={{ display: 'inline-block' }}>
      <Segment attached="top">
        <Image
          src={url ?? DefaultThumbnail}
          style={{
            width: 150,
            height: 150,
            display: 'inline-block',
            objectFit: 'cover',
          }}
        />
      </Segment>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={(event) => {
          const files = event.target.files;
          if (files && files[0]) {
            props.onChange?.(files[0]);
          }
        }}
      />
      <Button
        type="button"
        attached="bottom"
        onClick={() => inputRef.current?.click()}
        icon="upload"
        content="Choose image"
      />
    </div>
  );
};
