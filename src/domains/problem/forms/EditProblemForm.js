import * as yup from 'yup';
import * as React from 'react';
import {
  Segment,
  Form,
  Header,
  Input,
  Button,
  Dropdown,
  Label,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Editor } from '../../../page/common/Editor';
import { useFormik } from 'formik';
import { AddTestPackageForm } from '../../../page/problems/components/AddTestPackageForm';
import { TestPackageTable } from '../../../page/problems/components/TestPackageTable';
import { ProblemService } from '../../../service/ProblemService';
import { Comparators } from '../../../utility/sort';
import { useCodeLanguageSelect } from '../../code-language';
import { useTagSelect } from '../../tag';
import { editProblemValidationSchema } from './Schemas';
import { useFormErrorMessage } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { EditProblemFormSelectors } from '../../../store/selectors/EditProblemFormSelectors';
import { TestPackageSelectors } from '../../../store/selectors/TestPackageSelectors';
import { fetchTestPackagesByOwningProblem } from '../../../store/actions';
import { LoadingState } from '../../../store/common';

const TEST_PACKAGES_PAGE_SIZE = 5;

export function EditProblemForm(props) {
  const { initialProblem, onSubmitSuccess, onSubmitError, onCancel } = props;
  const [isTestPackageFormOpen, setTestPackageFormOpen] = React.useState(false);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchTestPackagesByOwningProblem.request(initialProblem.id));
  }, []);

  const {
    values,
    status,
    touched,
    errors,
    setStatus,
    setFieldValue,
    isValid,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange
  } = useFormik({
    initialValues: {
      ...initialProblem
    },
    initialStatus: {
      errors: {}
    },
    validationSchema: editProblemValidationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const problem = {
        ...values,
        activeTestPackage: { id: values.activeTestPackage },
        testPackages: undefined
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
    setFieldValue('definition', editor.getData());
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

  const state = useSelector(EditProblemFormSelectors.state());
  const ErrorMessage = useFormErrorMessage(touched, errors, status);
  return (
    <>
      <Header as={'h2'} block attached="top">
        Chỉnh sửa <Label size="large">{values.code}</Label>
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
            <ErrorMessage name="title" />
          </Form.Field>
          <Form.Field>
            <label>Đề bài</label>
            <CKEditor
              editor={Editor}
              data={values.definition}
              onBlur={handleEditorBlur}
            />
            <ErrorMessage name="definition" />
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
              <ErrorMessage name="timeLimit" />
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
              <ErrorMessage name="memoryLimit" />
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
              <ErrorMessage name="allowedLanguages" />
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
            {isTestPackageFormOpen && (
              <AddTestPackageForm
                problem={initialProblem}
                onClose={() => setTestPackageFormOpen(false)}
                onSubmitSuccess={() => {
                  setTestPackageFormOpen(false);
                  dispatch(
                    fetchTestPackagesByOwningProblem.request(
                      initialProblem.id,
                      {
                        pageNumber: 0,
                        pageSize: TEST_PACKAGES_PAGE_SIZE
                      }
                    )
                  );
                }}
              />
            )}
            {state.testPackages.loadingState === LoadingState.LOADING ? (
              <Loader active inline="centered" />
            ) : (
              <TestPackageTable
                ids={state.testPackages.ids}
                activeId={values.activeTestPackage}
                totalPages={state.testPackages.totalPages}
                pageNumber={state.testPackages.pageNumber}
                onPageChange={(event, { activePage }) => {
                  dispatch(
                    fetchTestPackagesByOwningProblem.request(
                      initialProblem.id,
                      {
                        pageNumber: activePage - 1,
                        pageSize: TEST_PACKAGES_PAGE_SIZE
                      }
                    )
                  );
                }}
                onActiveIdChange={id => {
                  setFieldValue('activeTestPackage', id);
                }}
              />
            )}
            <ErrorMessage name="activeTestPackage" />
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
