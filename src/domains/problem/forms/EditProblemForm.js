import * as React from 'react';
import {
  Form,
  Header,
  Input,
  Button,
  Modal,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Editor } from '../../../page/common/Editor';
import { useFormik } from 'formik';
import { JudgeConfigTable } from '../../../page/problems/components/JudgeConfigTable';
import { ProblemService } from '../../../service/ProblemService';
import { SubmissionLangSelect } from '../../submission-lang';
import { TagSelect } from '../../tag';
import { editProblemValidationSchema } from './Schemas';
import { useErrorMessageRenderer, LoadingIndicator } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProblem, fetchJudgeConfigs } from '../../../store/actions';
import { LoadingState } from '../../../store/common';
import { Target } from '../../../store/reducers/target';
import { ProblemSelectors } from '../../../store/selectors';
import { AddJudgeConfigForm } from '../../judge-config';
import { JudgeConfigSelectors } from '../../../store/selectors/JudgeConfigSelectors';
import { CancelButton, SubmitButton } from '../../../components/button';

const JUDGE_CONFIG_PAGE_SIZE = 5;

export function EditProblemForm(props) {
  const dispatch = useDispatch();
  const { problemId, onCancel, onSuccess } = props;
  const [submitting, setSubmitting] = React.useState();

  const { data } = useSelector(state => state.editProblemForm);

  React.useEffect(() => {
    dispatch(
      fetchProblem.request(
        { id: problemId },
        { target: Target.EDIT_PROBLEM_FORM }
      )
    );
    dispatch(
      fetchJudgeConfigs.request(
        {
          problemId,
          pageable: {
            page: 0,
            size: JUDGE_CONFIG_PAGE_SIZE
          }
        },
        { target: Target.EDIT_PROBLEM_FORM }
      )
    );
  }, []);

  const handleSubmit = React.useCallback(problem => {
    setSubmitting(true);
    ProblemService.updateProblem(problem.id, problem).then(({ data }) => {
      setSubmitting(false);
      onSuccess?.(data);
    });
  }, []);

  if (LoadingState.isInProgress(data.problem.loadingState)) {
    return <LoadingIndicator />;
  }

  return (
    <ProblemForm
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitting={submitting}
    />
  );
}

function ProblemForm(props) {
  const { submitting, onSubmit, onCancel } = props;
  const { data } = useSelector(state => state.editProblemForm);
  const problem = useSelector(ProblemSelectors.byId(data.problem.id));
  const activeJudgeConfig = useSelector(
    JudgeConfigSelectors.byId(problem.activeJudgeConfig)
  );

  const {
    values,
    status,
    touched,
    errors,
    setFieldValue,
    isValid,
    handleSubmit,
    handleBlur,
    handleChange
  } = useFormik({
    initialValues: {
      ...problem,
      activeJudgeConfig,
      judgeConfigs: undefined
    },
    initialStatus: {
      errors: {}
    },
    validationSchema: editProblemValidationSchema,
    onSubmit: values => {
      onSubmit?.(values);
    }
  });

  const handleEditorBlur = React.useCallback((event, editor) => {
    setFieldValue('definition', editor.getData());
  }, []);

  const handleCancel = React.useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const errorMessageRenderer = useErrorMessageRenderer({
    touched,
    errors,
    status
  });

  return (
    <Dimmer.Dimmable dimmed={submitting}>
      <Form onSubmit={handleSubmit} error={!isValid}>
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
        <Form.Field>
          <label>Đề bài</label>
          <CKEditor
            editor={Editor}
            data={values.definition}
            onBlur={handleEditorBlur}
          />
          {errorMessageRenderer('definition')}
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
            {errorMessageRenderer('timeLimit')}
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
            {errorMessageRenderer('memoryLimit')}
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Ngôn ngữ cho phép</label>
            <SubmissionLangSelect
              value={values.allowedLanguages}
              onChange={value => {
                setFieldValue('allowedLanguages', value);
              }}
            />
            {errorMessageRenderer('allowedLanguages')}
          </Form.Field>
          <Form.Field>
            <label>Tags</label>
            <TagSelect
              value={values.tags}
              onChange={value => setFieldValue('tags', value)}
            />
          </Form.Field>
        </Form.Group>
      </Form>

      <JudgeConfigSection
        onActiveJudgeConfigChange={judgeConfig =>
          setFieldValue('activeJudgeConfig', judgeConfig)
        }
        activeJudgeConfig={values.activeJudgeConfig}
      />
      {errorMessageRenderer('activeJudgeConfig')}

      <SubmitButton type="button" floated="right" onClick={handleSubmit} />
      <CancelButton floated="right" onClick={handleCancel} />

      <Dimmer inverted active={submitting}>
        <Loader />
      </Dimmer>
    </Dimmer.Dimmable>
  );
}

function JudgeConfigSection(props) {
  const { onActiveJudgeConfigChange, activeJudgeConfig } = props;
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.editProblemForm);
  const problem = useSelector(ProblemSelectors.byId(data.problem.id));

  const judgeConfigs = useSelector(
    JudgeConfigSelectors.byIds(data.judgeConfigs.ids)
  );

  const load = React.useCallback(
    ({ pageable } = {}) => {
      dispatch(
        fetchJudgeConfigs.request(
          {
            problemId: problem.id,
            pageable: pageable ? pageable : data.judgeConfigs.pageable
          },
          { target: Target.EDIT_PROBLEM_FORM }
        )
      );
    },
    [problem.id, data.judgeConfigs]
  );

  const [openAddForm, setOpenAddForm] = React.useState();

  return (
    <>
      <Header as={'h3'}>Bộ tests</Header>
      <Button primary type="button" onClick={() => setOpenAddForm(true)}>
        Thêm
      </Button>
      <Modal
        open={openAddForm}
        className="clear-fix-container"
        onClose={() => setOpenAddForm(false)}
      >
        <Modal.Header>Add Judge Config</Modal.Header>
        <Modal.Content>
          <AddJudgeConfigForm
            problemId={problem.id}
            onCancel={() => setOpenAddForm(false)}
            onSuccess={() => {
              console.log('called');
              setOpenAddForm(false);
              load();
            }}
          />
        </Modal.Content>
      </Modal>
      <JudgeConfigTable
        loading={LoadingState.isInProgress(data.judgeConfigs.loadingState)}
        judgeConfigs={judgeConfigs}
        activeJudgeConfig={activeJudgeConfig}
        totalPages={data.judgeConfigs.totalPages}
        activePage={data.judgeConfigs.pageable.page + 1}
        onPageChange={(event, { activePage }) => {
          load({
            pageable: {
              ...data.judgeConfigs.pageable,
              page: activePage - 1
            }
          });
        }}
        onActiveJudgeConfigChange={judgeConfig => {
          onActiveJudgeConfigChange(judgeConfig);
        }}
      />
    </>
  );
}
