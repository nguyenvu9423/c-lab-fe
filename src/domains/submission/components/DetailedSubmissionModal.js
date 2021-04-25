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
import {
  SubmissionStatusLabel,
  TestResultLabel,
  ErrorLabel
} from '../../../page/submission/components';
import { fetchDetailedSubmissionById } from '../../../store/actions';
import { LoadingIndicator } from '../../../components/loading-indicator';
import { SubmissionSelector } from '../../../store/selectors';
import { SubmissionVerdict } from '../result/SubmissionVerdict';
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
  const { code, detailedResult } = detailedSubmission;
  const submission = useSelector(SubmissionSelector.byId(submissionId));
  const { result, judgeConfig } = submission;
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

  if (verdict === SubmissionVerdict.COMPILE_ERROR) {
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
        {testResults.map(testResult => {
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
