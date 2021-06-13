import React from 'react';
import * as yup from 'yup';

import { Button, Form, Segment, TextArea, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import DefaultThumbnail from '../../../public/images/default-thumbnail.png';
import { ArticleStatus } from '.';
import { TagSelect } from '../tag';
import { serverPath } from '../../server';
import { SubmitButton, CancelButton } from '../../components/button';
import { useErrorMessageRenderer, RichTextEditor } from '../../components';
import { articleStatusValues } from './ArticleStatus';

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title should be at last 3 characters'),
  content: yup.string().required('Content is required')
});

export function ArticleForm(props) {
  const { initialArticle, onSubmit, onCancel } = props;
  const {
    values,
    setFieldValue,
    touched,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors
  } = useFormik({
    initialValues: initialArticle
      ? {
          status: initialArticle.status || undefined,
          title: initialArticle.title || '',
          subtitle: initialArticle.subtitle || '',
          overview: initialArticle.overview || '',
          content: initialArticle.content || '',
          thumbnailURL: initialArticle.thumbnailURL || '',
          tags: initialArticle.tags || []
        }
      : {
          status: ArticleStatus.ACTIVE.name,
          title: '',
          subtitle: '',
          overview: '',
          content: '',
          thumbnailURL: '',
          tags: []
        },
    validationSchema,
    onSubmit: values => {
      onSubmit?.(values);
    }
  });

  const handleEditorBlur = React.useCallback((event, editor) => {
    setFieldValue('content', editor.getData());
    setFieldTouched('content', true);
  }, []);

  const openCKFinder = React.useCallback(() => {
    CKFinder.modal({
      chooseFiles: true,
      connectorPath: serverPath.resolve('ckfinder/connector'),
      onInit: finder => {
        finder.on('files:choose', evt => {
          const file = evt.data.files.first();
          if (file) {
            const { attributes } = file;
            setFieldValue('thumbnailURL', attributes.url);
          }
        });
      }
    });
  }, []);

  const errorMessageRender = useErrorMessageRenderer({ touched, errors });

  return (
    <Form
      className={'article clear-fix-container'}
      onSubmit={handleSubmit}
      error={true}
      loading={isSubmitting}
    >
      <Form.Group widths="equal">
        <Form.Field>
          <label>Title</label>
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
            onBlur={(event, data) => {
              setFieldTouched(data.value);
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
            onChange={value => setFieldValue('tags', value)}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Content</label>
        <RichTextEditor />
        {errorMessageRender('content')}
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <Form.Field>
          <TextArea
            name="overview"
            rows={6}
            placeholder="Brief description about the article..."
            value={values.overview}
            onChange={handleChange}
          />
        </Form.Field>
      </Form.Field>

      <Form.Field>
        <label>Thumbnail</label>
        <div style={{ display: 'inline-block' }}>
          <Segment attached="top">
            <Image
              src={values.thumbnailURL ? values.thumbnailURL : DefaultThumbnail}
              style={{
                width: 150,
                height: 150,
                display: 'inline-block',
                objectFit: 'cover'
              }}
            />
          </Segment>
          <Button
            type="button"
            attached="bottom"
            onClick={openCKFinder}
            icon="upload"
            content="Choose image"
          />
        </div>
      </Form.Field>
      <SubmitButton floated="right" disabled={isSubmitting} />
      <CancelButton floated="right" onClick={() => onCancel?.()} />
    </Form>
  );
}

const statusOptions = articleStatusValues.map(item => {
  return {
    text: item.title,
    value: item.name
  };
});
