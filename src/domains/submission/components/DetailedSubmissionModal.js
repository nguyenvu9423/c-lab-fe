import * as React from 'react';
import {
  Modal as UiModal,
  Header,
  Grid,
  List,
  Message,
  Segment,
  Button,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../../store/actions/modal';
import { LoadingState } from '../../../store/common';
import { CodeEditor } from '../../../components/editors';
import {
  JudgeStatusLabel,
  TestResultLabel,
  ErrorLabel,
  JudgeProgressType,
  useJudgesStream,
} from '../../judge';
import {
  fetchDetailedSubmission,
  updateEntity,
  clearDetailedResult,
  fetchDetailedJudge,
} from '../../../store/actions';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { SubmissionSelector } from '../../../store/selectors';
import { JudgeVerdict } from '../../judge/JudgerVerdict';
import {
  formatResourceTime,
  formatResourceMemory,
} from '../../../page/problems/utils';
import { SubmissionService } from '../../../service/SubmissionService';
import { normalize } from 'normalizr';
import { submissionSchema } from '../../../entity-schemas/submission-schemas';
import { Target } from '../../../store/reducers/target';
import { JudgeSelectors } from '../../../store/selectors/JudgeSelectors';
import { JudgeService } from '../../../service/JudgeService';

const DetailedSubmissionModal = (props) => {
  const { submissionId } = props;
  const { data } = useSelector((state) => state.detailedSubmissionModal);

  const submission = useSelector(
    data.submission.id
      ? SubmissionSelector.byId(data.submission.id)
      : () => undefined
  );

  const code = data.code.code;
  const detailedResult = data.detailedResult.detailedResult;

  const dispatch = useDispatch();

  const loadDetailedSubmission = React.useCallback(() => {
    dispatch(
      fetchDetailedSubmission.request(
        { submissionId },
        { target: Target.DETAILED_SUBMISSION_MODAL }
      )
    );
  }, []);

  const loadDetailedResult = React.useCallback(() => {
    dispatch(
      fetchDetailedJudge.request(
        { submissionId },
        { target: Target.DETAILED_SUBMISSION_MODAL }
      )
    );
  }, []);

  React.useEffect(() => {
    loadDetailedSubmission();
    loadDetailedResult();
  }, []);

  const judgeId = submission?.judge;
  const judge = useSelector(JudgeSelectors.byId(judgeId));

  const currentProgress = React.useRef(judge?.progress.status.type);

  React.useEffect(() => {
    if (
      currentProgress.current === JudgeProgressType.IN_PROGRESS &&
      judge?.progress.status.type === JudgeProgressType.SUCCESS
    ) {
      loadDetailedResult();
    }
    currentProgress.current = judge?.progress.status.type;
  }, [judge?.progress.status.type]);

  useJudgesStream(judge ? [judge.id] : []);

  const rejudge = React.useCallback(() => {
    dispatch(
      clearDetailedResult({}, { target: Target.DETAILED_SUBMISSION_MODAL })
    );
    SubmissionService.rejudgeSubmission(submission.id).then(({ data }) => {
      const { entities } = normalize(data, submissionSchema);
      dispatch(updateEntity(entities));
    });
  }, [submission]);

  const [isCancellingJudge, setIsCancellingJudge] = React.useState(false);

  const cancelJudge = React.useCallback(() => {
    if (judgeId) {
      setIsCancellingJudge(true);
      JudgeService.cancel(judgeId).then(() => {
        setIsCancellingJudge(false);
      });
    }
  }, [judgeId]);

  const handleClose = React.useCallback(() => {
    dispatch(hideModal());
  }, []);

  if (data.submission.loadingState !== LoadingState.LOADED) {
    return <LoadingIndicator />;
  }

  const { result, config: judgeConfig } = judge;
  const inProgress =
    judge.progress.status.type == JudgeProgressType.IN_PROGRESS;

  return (
    <UiModal
      open={true}
      closeIcon
      closeOnEscape
      closeOnDimmerClick
      onClose={handleClose}
    >
      <Header color="blue">Submission #{submission.id}</Header>
      <UiModal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <>
                <Button
                  content="Rejudge"
                  icon="redo"
                  labelPosition="left"
                  onClick={rejudge}
                  disabled={inProgress}
                />{' '}
                {inProgress && (
                  <Button
                    icon="stop"
                    content="Stop"
                    negative
                    disabled={isCancellingJudge}
                    onClick={cancelJudge}
                  />
                )}
              </>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h4">Result</Header>
              <JudgeStatusLabel judgeId={judgeId} />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h4">Resource</Header>
              <span>{`
              ${formatResourceTime(result?.resource.time)} - 
              ${formatResourceMemory(result?.resource.memory)}`}</span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4">Code</Header>
              <CodeEditor style={{ maxHeight: 720 }} value={code} readOnly />
            </Grid.Column>
          </Grid.Row>
          {detailedResult && (
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h4">Result Log</Header>
                <DetailedResult
                  detailedResult={detailedResult}
                  scoringType={judgeConfig.scoringType}
                />
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </UiModal.Content>
    </UiModal>
  );
};

function DetailedResult(props) {
  const { detailedResult, scoringType } = props;
  const { verdict, testResults } = detailedResult;

  if (verdict === JudgeVerdict.COMPILE_ERROR) {
    const message = detailedResult.message;
    return (
      <span>
        <strong>Compilation</strong>
        <ErrorLabel message="Compile error" />
        <Message negative>{message}</Message>
      </span>
    );
  } else
    return (
      <List className="result-log-list" size={'mini'}>
        {testResults.map((testResult) => {
          const { test } = testResult;
          return (
            <List.Item key={test.id}>
              <List.Content>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Header as="h5" style={{ display: 'inline-block' }}>
                    Test {test.id}
                  </Header>

                  <TestResultLabel
                    testResult={testResult}
                    scoringType={scoringType}
                  />
                </div>

                <Header as="h5" attached="top" size="mini">
                  Input
                </Header>
                <Segment attached size="mini">
                  <pre>{test.input.overview}</pre>
                </Segment>

                <Header as="h5" attached size="mini">
                  Output
                </Header>
                <Segment attached="bottom" size="mini">
                  <pre>{testResult.outputOverview}</pre>
                </Segment>

                <Header as="h5" attached="top" size="mini">
                  Answer
                </Header>
                <Segment attached="bottom" size="mini">
                  <pre>{test.output.overview}</pre>
                </Segment>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
}

export default DetailedSubmissionModal;
