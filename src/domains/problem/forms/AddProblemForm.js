import * as React from 'react';
import { Form, Input, Dropdown } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { ProblemService } from '../../../service/ProblemService';
import { useSubmissionLangSelect } from '../../submission-lang';
import { useErrorMessageRenderer } from '../../../components/form';
import { useTagSelect } from '../../tag';
import { ExceptionTypes } from '../../../exception/ExceptionTypes';
import { addProblemValidationSchema } from './Schemas';
import { SubmitButton, CancelButton } from '../../../components/button';
import { MarkdownEditor } from '../../../components';

export function AddProblemForm(props) {
  const { onSuccess, onCancel } = props;
  const [isSubmitting, setSubmitting] = React.useState(false);
  const {
    values,
    status,
    setStatus,
    setFieldValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      code: '',
      title: '',
      definition: '',
      allowedLanguages: [],
      tags: [],
    },
    initialStatus: {
      errors: {},
    },
    validationSchema: addProblemValidationSchema,
    onSubmit: (values) => {
      ProblemService.create(values)
        .then(({ data }) => {
          setSubmitting(false);
          onSuccess?.(data);
        })
        .catch((ex) => {
          setSubmitting(false);
          if (ex.response) {
            const errors = {};
            const body = ex.response.data;
            if (body.type === ExceptionTypes.INVALID_FORM) {
              body.errors.forEach((error) => {
                errors[error.field] = error.defaultMessage;
              });
              setStatus({ errors });
            }
          }
        });
    },
  });

  const { languageOptions, mapLanguageToValue, mapValueToLanguage } =
    useSubmissionLangSelect();

  const handleDefinitionChange = React.useCallback((content) => {
    setFieldValue('definition', content);
    setFieldTouched('definition');
  }, []);

  const handleCodeChange = React.useCallback(
    (event, data) => {
      setFieldValue('code', data.value.toUpperCase());
      setStatus({
        ...status,
        errors: { ...status.errors, ['code']: null },
      });
    },
    [status]
  );

  const tagSelect = useTagSelect(values.tags);
  const errorMessageRenderer = useErrorMessageRenderer({
    touched,
    errors,
    status,
  });

  return (
    <>
      <Form onSubmit={handleSubmit} error={true} loading={isSubmitting}>
        <Form.Group>
          <Form.Field width={4}>
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
          <Form.Field width={12}>
            <label>Title</label>
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
          <label>Definition</label>
          <MarkdownEditor onChange={handleDefinitionChange} />
          {errorMessageRenderer('definition')}
        </Form.Field>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Allowed languages</label>
            <Dropdown
              selection
              multiple
              fluid
              options={languageOptions}
              value={values.allowedLanguages.map(mapLanguageToValue)}
              onChange={(event, data) => {
                setFieldValue(
                  'allowedLanguages',
                  data.value.map(mapValueToLanguage)
                );
              }}
            />
            {errorMessageRenderer('allowedLanguages')}
          </Form.Field>
          <Form.Field>
            <label>Tags</label>
            <Dropdown
              selection
              multiple
              search
              fluid
              loading={tagSelect.isFetching}
              options={tagSelect.options}
              value={values.tags.map(tagSelect.mapTagToValue)}
              onSearchChange={(event, { searchQuery }) => {
                tagSelect.handleSearchChange(searchQuery);
              }}
              onChange={(event, data) => {
                setFieldValue('tags', data.value.map(tagSelect.mapValueToTag));
              }}
            />
          </Form.Field>
          <input type="submit" style={{ display: 'none' }} />
        </Form.Group>
      </Form>

      <SubmitButton floated="right" onClick={handleSubmit} />
      <CancelButton floated="right" onClick={() => onCancel?.()} />
    </>
  );
}
