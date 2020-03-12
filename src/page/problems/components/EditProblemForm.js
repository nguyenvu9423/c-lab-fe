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
import { CodeLanguageService } from '../../../service/CodeLanguageService';
import { ProblemService } from '../../../service/ProblemService';
import { Comparators } from '../../../utility/sort';
import { TagService } from '../../../service/TagService';

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .required('Problem code is required')
    .min(3, 'Problem code sould be at least 3 characters')
});

export function EditProblemForm(props) {
  const { initialProblem, onSubmitSuccess, onSubmitError } = props;
  const [languageOptions, setLanguageOptions] = React.useState([]);
  const [testPackageIds] = React.useState(
    [...initialProblem.testPackages].sort(Comparators.numberDesc)
  );
  const formik = useFormik({
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

  const {
    values,
    setFieldValue,
    setValues,
    isValid,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange
  } = formik;

  React.useEffect(() => {
    CodeLanguageService.getAll().then(({ data: langs }) => {
      setLanguageOptions(
        langs.map(lang => ({
          text: lang.title,
          value: lang.id,
          fieldvalue: lang
        }))
      );
    });
  }, []);

  const handleEditorBlur = React.useCallback((event, editor) =>
    setValues(
      {
        ...values,
        definition: editor.getData()
      },
      []
    )
  );

  const [isTestPackageFormOpen, setTestPackageFormOpen] = React.useState(false);

  const [isFetchingTags, setIsFetchingTags] = React.useState(false);
  const tagFetchingTimeoutRef = React.useRef();
  const [tagOptions, setTagOptions] = React.useState(
    values.tags.map(tag => ({
      text: tag.name,
      value: tag.name,
      fieldvalue: tag
    }))
  );
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
                value={values.allowedLanguages.map(item => item.id)}
                onChange={(event, data) => {
                  setFieldValue(
                    'allowedLanguages',
                    data.value.map(item => ({
                      id: item
                    }))
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
                value={values.tags.map(tag => tag.name)}
                onSearchChange={(event, { searchQuery }) => {
                  if (!searchQuery) return;
                  if (tagFetchingTimeoutRef.current) {
                    clearTimeout(tagFetchingTimeoutRef.current);
                  }
                  tagFetchingTimeoutRef.current = setTimeout(() => {
                    setIsFetchingTags(true);
                    TagService.getTagByContainedText(searchQuery)
                      .then(({ data: { content } }) => {
                        setTagOptions(prevTagOptions => {
                          const tags = content.filter(item =>
                            prevTagOptions.every(
                              option => option.value !== item.name
                            )
                          );
                          return [
                            ...prevTagOptions,
                            ...tags.map(tag => ({
                              text: tag.name,
                              value: tag.name,
                              fieldvalue: tag
                            }))
                          ];
                        });
                        setIsFetchingTags(false);
                      })
                      .catch(() => {
                        setIsFetchingTags(false);
                      });
                  }, 500);
                }}
                onAddItem={(event, { value }) => {
                  setTagOptions(prevTagOptions => [
                    ...prevTagOptions,
                    { text: value, value, fieldvalue: { name: value } }
                  ]);
                }}
                onChange={(event, data) => {
                  setFieldValue(
                    'tags',
                    data.value.map(value => {
                      const option = tagOptions.find(
                        item => item.value === value
                      );
                      if (option) {
                        return option.fieldvalue;
                      } else {
                        return { name: value };
                      }
                    })
                  );
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

          <Form.Button
            type="button"
            floated="right"
            primary
            onClick={handleSubmit}
          >
            Lưu
          </Form.Button>
        </Form>
      </Segment>
    </>
  );
}
