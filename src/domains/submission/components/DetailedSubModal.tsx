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
  useJudgesStream,
  InProgressJudge,
  Judge,
  SuccessJudge,
} from '../../judge';
import {
  updateEntity,
  fetchDetailedJudge,
  fetchDetailedSub,
} from '../../../store/actions';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { JudgeVerdict } from '../../judge';
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
import { State } from '../../../store';
import { DetailedSubSelectors } from '../../../store/selectors/DetailedSubSelectors';
import {
  DetailedJudgeSelectors,
  SubmissionSelectors,
} from '../../../store/selectors';

export const DetailedSubModal: React.FC<{ submissionId: number }> = (props) => {
  const { submissionId } = props;
  const { data } = useSelector((state: State) => state.detailedSubModal);
  const dispatch = useDispatch();

  const detailedSub = useSelector(
    data.detailedSub.loadingState === LoadingState.LOADED
      ? DetailedSubSelectors.byId(data.detailedSub.id)
      : () => undefined
  );

  const code = detailedSub?.code;

  const detailedJudge = useSelector(
    data.detailedJudge.loadingState === LoadingState.LOADED
      ? DetailedJudgeSelectors.byId(data.detailedJudge.result)
      : () => undefined
  );

  const submission = useSelector(
    data.detailedSub.loadingState === LoadingState.LOADED
      ? SubmissionSelectors.byId(data.detailedSub.id)
      : () => undefined
  );

  const judgeId = submission?.judge;
  const judge = useSelector(
    judgeId ? JudgeSelectors.byId(judgeId) : () => undefined
  );

  const detailedResult =
    judge?.id && judge.id === detailedJudge?.id
      ? detailedJudge?.detailedResult
      : undefined;

  const loadDetailedSub = React.useCallback(() => {
    dispatch(
      fetchDetailedSub.request({
        submissionId,
        target: Target.DETAILED_SUB_MODAL,
      })
    );
  }, []);

  const loadDetailedJudge = React.useCallback(() => {
    dispatch(
      fetchDetailedJudge.request({
        submissionId,
        target: Target.DETAILED_SUB_MODAL,
      })
    );
  }, []);

  React.useEffect(() => {
    loadDetailedSub();
    loadDetailedJudge();
  }, []);

  const currentJudge = React.useRef<Judge | undefined>(judge);

  React.useEffect(() => {
    if (
      currentJudge.current &&
      InProgressJudge.isInstance(currentJudge.current) &&
      judge &&
      SuccessJudge.isInstance(judge)
    ) {
      loadDetailedJudge();
    }
    currentJudge.current = judge;
  }, [judge]);

  useJudgesStream(judge ? [judge.id] : []);

  const rejudge = React.useCallback(() => {
    if (detailedSub) {
      SubmissionService.rejudgeSubmission(detailedSub.id).then(({ data }) => {
        const { entities } = normalize(data, submissionSchema);
        dispatch(updateEntity({ entities }));
      });
    }
  }, [detailedSub]);

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

  const result = judge?.result;
  const judgeConfig = judge?.config;
  const inProgress = judge && InProgressJudge.isInstance(judge);

  return (
    <UiModal
      open={true}
      closeIcon
      closeOnEscape
      closeOnDimmerClick
      onClose={handleClose}
    >
      {data.detailedSub.loadingState === LoadingState.LOADING && (
        <LoadingIndicator />
      )}

      {data.detailedSub.loadingState === LoadingState.LOADED &&
        detailedSub &&
        judgeId && (
          <>
            <Header color="blue">Submission #{detailedSub.id}</Header>
            <UiModal.Content scrolling>
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
              ${formatResourceTime(result?.resource?.time)} - 
              ${formatResourceMemory(result?.resource?.memory)}`}</span>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h4">Code</Header>
                    <CodeEditor
                      style={{ maxHeight: 720 }}
                      value={code}
                      readOnly
                    />
                  </Grid.Column>
                </Grid.Row>
                {detailedResult && (
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Header as="h4">Result Log</Header>
                      <DetailedResult
                        detailedResult={detailedResult}
                        scoringType={judgeConfig?.scoringType}
                      />
                    </Grid.Column>
                  </Grid.Row>
                )}
              </Grid>
            </UiModal.Content>
          </>
        )}
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

                <Header as="h5" attached="top" size="tiny">
                  Input
                </Header>
                <Segment attached size="tiny">
                  <pre>{test.input.overview}</pre>
                </Segment>

                <Header as="h5" attached size="tiny">
                  Output
                </Header>
                <Segment attached="bottom" size="tiny">
                  <pre>{testResult.outputOverview}</pre>
                </Segment>

                <Header as="h5" attached="top" size="tiny">
                  Answer
                </Header>
                <Segment attached="bottom" size="tiny">
                  <pre>{test.output.overview}</pre>
                </Segment>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
}
