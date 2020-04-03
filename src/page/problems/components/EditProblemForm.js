import * as yup from 'yup';
import * as React from 'react';
import {
  Segment,
  Form,
  Header,
  Input,
  Button,
  Dropdown
} from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Editor } from '../../common/Editor';
import { useFormik } from 'formik';
import { AddTestPackageForm } from './AddTestPackageForm';
import { TestPackageTable } from './TestPackageTable';
import { ProblemService } from '../../../service/ProblemService';
import { Comparators } from '../../../utility/sort';
import { useCodeLanguageSelect } from '../../../domains/code-language';
import { useTagSelect } from '../../../domains/tag';

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .required('Problem code is required')
    .min(3, 'Problem code sould be at least 3 characters')
});

export function EditProblemForm(props) {
  const { initialProblem, onSubmitSuccess, onSubmitError, onCancel } = props;
  const [testPackageIds] = React.useState(
    [...initialProblem.testPackages].sort(Comparators.numberDesc)
  );
  const [isTestPackageFormOpen, setTestPackageFormOpen] = React.useState(false);

  const {
    values,
    setFieldValue,
    setValues,
    isValid,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange
  } = useFormik({
    initialValues: {
      ...initialProblem
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const problem = {
        ...values,
        activeTestPackage: { id: values.activeTestPackage },
        testPackages: values.testPackages.map(id => ({ id }))
      };
      ProblemService.updateProblem(problem.id, problem).then(
        response => {
          setSubmitting(false);
          if (onSubmitSuccess) onSubmitSuccess(response);
        },
        error => {
          setSubmitting(false);
          if (onSubmitError) onSubmitError(error);
        }
      );
    }
  });

  const handleEditorBlur = React.useCallback((event, editor) => {
    setFieldValue('definition', editor.getData);
  }, []);

  const handleCancel = React.useCallback(() => {
    if (onCancel) onCancel();
  }, [onCancel]);

  const {
    languageOptions,
    mapValueToLanguage,
    mapLanguageToValue
  } = useCodeLanguageSelect();

  const {
    tagOptions,
    mapTagToValue,
    mapValueToTag,
    isFetchingTags,
    handleTagSearchChange,
    handleAddOption
  } = useTagSelect(values.tags);

  return (
    <>
      <Header as={'h2'} block attached="top">
        Cập nhật
      </Header>
      <Segment className="clear-fix-container" attached>
        <Header as={'h3'}>Nội dung</Header>
        <Form onSubmit={handleSubmit} error={!isValid} loading={isSubmitting}>
          <Form.Field>
            <label>Tiêu đề</label>
            <Form.Input
              type="text"
              name="title"
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Đề bài</label>
            <CKEditor
              editor={Editor}
              data={values.definition}
              onBlur={handleEditorBlur}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Giới hạn thời gian</label>
              <Input
                type="number"
                name="timeLimit"
                label="ms"
                labelPosition="right"
                value={values.timeLimit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Giới hạn bộ nhớ</label>
              <Input
                type="number"
                name="memoryLimit"
                label="mb"
                labelPosition="right"
                value={values.memoryLimit}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Ngôn ngữ cho phép</label>
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
            </Form.Field>
            <Form.Field>
              <label>Tags</label>
              <Dropdown
                selection
                multiple
                search
                fluid
                allowAdditions
                loading={isFetchingTags}
                options={tagOptions}
                value={values.tags.map(mapTagToValue)}
                onSearchChange={(event, { searchQuery }) => {
                  handleTagSearchChange(searchQuery);
                }}
                onAddItem={(event, { value }) => {
                  handleAddOption(value);
                }}
                onChange={(event, data) => {
                  setFieldValue('tags', data.value.map(mapValueToTag));
                }}
              />
            </Form.Field>
          </Form.Group>

          <Header as={'h3'}>Bộ tests</Header>

          <Form.Field>
            <Button
              primary
              type="button"
              onClick={() => setTestPackageFormOpen(true)}
            >
              Thêm
            </Button>
            <AddTestPackageForm
              problem={initialProblem}
              isOpen={isTestPackageFormOpen}
              onClose={() => setTestPackageFormOpen(false)}
            />
            <TestPackageTable
              testPackageIds={testPackageIds}
              activeTestPackageId={values.activeTestPackage}
              onSetActiveTestPackage={testPackage => {
                setValues({
                  ...values,
                  activeTestPackage: testPackage
                });
              }}
            />
          </Form.Field>
          <Form.Field>
            <Button
              type="button"
              primary
              floated="right"
              onClick={handleSubmit}
            >
              Lưu
            </Button>
            <Button type="button" floated="right" onClick={handleCancel}>
              Hủy
            </Button>
          </Form.Field>
        </Form>
      </Segment>
    </>
  );
}
problem