import * as React from 'react';
import {
  Modal as UiModal,
  Header,
  Grid,
  List,
  Message,
  Segment,
  Divider,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState } from '../../../store/common';
import { CodeEditor } from '../../../components/editors';
import {
  TestResultLabel,
  ErrorLabel,
  useJudgesStream,
  InProgressJudge,
  Judge,
  SuccessJudge,
} from '../../judge';
import {
  fetchDetailedJudge,
  fetchDetailedSub,
  setModal,
} from '../../../store/actions';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { JudgeVerdict } from '../../judge';
import {
  formatResourceTime,
  formatResourceMemory,
} from '../../../page/problems/utils';
import { Target } from '../../../store/reducers/target';
import { JudgeSelectors } from '../../../store/selectors/JudgeSelectors';
import { State } from '../../../store';
import { DetailedSubSelectors } from '../../../store/selectors/DetailedSubSelectors';
import {
  AuthorizationSelectors,
  ConstSelectors,
  DetailedJudgeSelectors,
  SubmissionSelectors,
} from '../../../store/selectors';
import { QualifySubButton } from './buttons';
import { SubmissionStatusLabel } from './SubmissionStatusLabel';
import { RejudgeSubButton } from './buttons/RejudgeSubButton';

export namespace DetailedSubModal {
  export interface Props {
    submissionId: number;
  }
}

export const DetailedSubModal: React.FC<DetailedSubModal.Props> = (props) => {
  const { submissionId } = props;
  const { data } = useSelector((state: State) => state.detailedSubModal);
  const dispatch = useDispatch();

  const detailedSub = useSelector(
    data.detailedSub.loadingState === LoadingState.LOADED
      ? DetailedSubSelectors.byId(data.detailedSub.id)
      : () => undefined
  );

  const submission = useSelector(
    data.detailedSub.loadingState === LoadingState.LOADED
      ? SubmissionSelectors.byId(data.detailedSub.id)
      : () => undefined
  );

  const code = detailedSub?.code;

  const detailedJudge = useSelector(
    data.detailedJudge.loadingState === LoadingState.LOADED
      ? DetailedJudgeSelectors.byId(data.detailedJudge.result)
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

  const canUpdate = useSelector(
    submission
      ? AuthorizationSelectors.canUpdateSubmission(submission)
      : ConstSelectors.value(false)
  );

  const handleClose = React.useCallback(() => {
    dispatch(setModal(null));
  }, []);

  const result = judge?.result;
  const judgeConfig = judge?.config;

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
        submission &&
        judgeId && (
          <>
            <Header color="blue">Submission #{submission.id}</Header>
            <UiModal.Content scrolling>
              <Grid>
                {canUpdate && (
                  <>
                    <Grid.Row>
                      <Grid.Column>
                        <div className="clear-fix-container">
                          <Header as="h3">Settings</Header>
                          <RejudgeSubButton submission={submission} />
                          <QualifySubButton submission={submission} />
                        </div>
                      </Grid.Column>
                    </Grid.Row>
                    <Divider />
                  </>
                )}
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Header as="h4">Result</Header>
                    <SubmissionStatusLabel submission={submission} />
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
