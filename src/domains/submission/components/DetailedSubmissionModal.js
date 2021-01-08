import * as React from 'react';
import {
  Modal as UiModal,
  Header,
  Grid,
  List,
  Message,
  Segment
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../../store/actions/modal';
import { LoadingState } from '../../../store/common';
import { CodeEditor } from '../../../components/editors';
import { SubmissionStatusLabel } from '../../../page/submission/components/SubmissionStatusLabel';
import { fetchDetailedSubmissionById } from '../../../store/actions';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { SubmissionSelector } from '../../../store/selectors';
import { TestResultLabel } from '../../../page/submission/components/test-result-labels';
import { SubmissionVerdict } from '../result/SubmissionVerdict';
import { ErrorStatusLabel } from '../../../page/submission/components/status-labels';
import {
  formatResourceTime,
  formatResourceMemory
} from '../../../page/problems/utils';

const DetailedSubmissionModal = props => {
  const dispatch = useDispatch();
  const { submissionId } = props;
  const slice = useSelector(state => state.detailedSubmissionModal);

  React.useEffect(() => {
    dispatch(fetchDetailedSubmissionById.request(submissionId));
  }, []);

  const { detailedSubmission } = slice;
  const { code, resultLog } = detailedSubmission;
  const submission = useSelector(SubmissionSelector.byId(submissionId));
  const { result } = submission;
  const handleClose = React.useCallback(() => {
    dispatch(hideModal());
  }, []);

  if (detailedSubmission.loadingState != LoadingState.LOADED) {
    return <LoadingIndicator />;
  }

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
            <Grid.Column width={8}>
              <Header as="h4">Result</Header>
              <SubmissionStatusLabel submission={submission} />
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as="h4">Resource</Header>
              {/* <span>{`
              ${formatResourceTime(result?.resource.time)} - 
              ${formatResourceMemory(result?.resource.memory)}`}</span> */}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4">Code</Header>
              <CodeEditor style={{ maxHeight: 720 }} value={code} readOnly />
            </Grid.Column>
          </Grid.Row>
          {resultLog && (
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h4">Result Log</Header>
                <ResultLog resultLog={resultLog} />
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </UiModal.Content>
    </UiModal>
  );
};

function ResultLog(props) {
  const { resultLog } = props;
  const { verdict: verdictName, testResults } = resultLog;
  const verdict = SubmissionVerdict.getByName(verdictName);
  if (verdict === SubmissionVerdict.COMPILE_ERROR) {
    const message = resultLog.message;
    return (
      <span>
        <strong>Compilation</strong>
        <ErrorStatusLabel message="Compile error" />
        <Message negative>{message}</Message>
      </span>
    );
  } else
    return (
      <List className="result-log-list">
        {testResults.map(test => {
          return (
            <List.Item key={test.testId}>
              <List.Content>
                <Header as="h5" style={{ display: 'inline-block' }}>
                  Test {test.testId}
                </Header>

                <TestResultLabel testResult={test} />

                <Header as="h5" attached="top">
                  Input
                </Header>
                <Segment attached>
                  <pre>{test.input}</pre>
                </Segment>

                <Header as="h5" attached>
                  Output
                </Header>
                <Segment attached="bottom">
                  <pre>{test.userOutput}</pre>
                </Segment>

                <Header as="h5" attached="top">
                  Answer
                </Header>
                <Segment attached="bottom">
                  <pre>{test.output}</pre>
                </Segment>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
}

export default DetailedSubmissionModal;
