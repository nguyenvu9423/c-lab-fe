import * as React from 'react';
import { Modal, Header, Grid, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState } from '@/store/common';
import { CodeEditor } from '@/components/editors';
import { useJudgesStream } from '../../judge';
import {
  fetchDetailedJudge,
  fetchDetailedSub,
  setModal,
} from '@/store/actions';
import { LoadingIndicator } from '@/components/loading-indicator';
import {
  formatResourceTime,
  formatResourceMemory,
} from '../../../pages/problems/utils';
import { Target } from '@/store/reducers/target';
import { JudgeSelectors } from '@/store/selectors/JudgeSelectors';
import { State } from '../../../store';
import { DetailedSubSelectors } from '@/store/selectors/DetailedSubSelectors';
import {
  AuthorizationSelectors,
  ConstSelectors,
  DetailedJudgeSelectors,
  SubmissionSelectors,
} from '@/store/selectors';
import { QualifySubButton } from './buttons';
import { SubmissionStatusLabel } from './SubmissionStatusLabel';
import { RejudgeSubButton } from './buttons/RejudgeSubButton';
import { DateTimeUtils } from '../../../utils/data-type/DateTimeUtils';
import { DateTimeFormat } from '../../../config';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { ResultLog } from './ResultLog';
import { InProgressJudge, Judge, SuccessJudge } from '@/domains/judge';

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
      : () => undefined,
  );

  const submission = useSelector(
    data.detailedSub.loadingState === LoadingState.LOADED
      ? SubmissionSelectors.byId(data.detailedSub.id)
      : () => undefined,
  );

  const detailedJudge = useSelector(
    data.detailedJudge.loadingState === LoadingState.LOADED
      ? DetailedJudgeSelectors.byId(data.detailedJudge.result)
      : () => undefined,
  );

  const judge = useSelector(
    submission?.judge
      ? JudgeSelectors.byId(submission.judge)
      : ConstSelectors.value(undefined),
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
      }),
    );
  }, []);

  const loadDetailedJudge = React.useCallback(() => {
    dispatch(
      fetchDetailedJudge.request({
        submissionId,
        target: Target.DETAILED_SUB_MODAL,
      }),
    );
  }, []);

  React.useEffect(() => {
    loadDetailedSub();
    loadDetailedJudge();
  }, []);

  useJudgeCompletionHandler(judge, loadDetailedJudge);
  useJudgesStream(judge ? [judge.id] : []);

  const canUpdate = useSelector(
    submission
      ? AuthorizationSelectors.canUpdateSubmission(submission)
      : ConstSelectors.value(false),
  );

  return (
    <Modal
      open={true}
      closeIcon
      closeOnEscape
      closeOnDimmerClick
      onClose={() => dispatch(setModal(null))}
    >
      {DataHolder.isLoading(data.detailedSub) && <LoadingIndicator />}
      {DataHolder.isLoaded(data.detailedSub) &&
        detailedSub &&
        submission &&
        judge && (
          <>
            <Header color="blue">Bài nộp #{submission.id}</Header>
            <Modal.Content scrolling>
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
                  <Grid.Column width={4}>
                    <Header as="h4">Kết quả</Header>
                    <SubmissionStatusLabel submission={submission} />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Header as="h4">Tài nguyên</Header>
                    <span>
                      {formatResourceTime(judge.result?.resource?.time)} /{' '}
                      {formatResourceMemory(judge.result?.resource?.memory)}
                    </span>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Header as="h4">Ngôn ngữ</Header>
                    <span>{submission.language.title}</span>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Header as="h4">Thời điểm nộp</Header>
                    <span>
                      {DateTimeUtils.of(submission.submittedAt).format(
                        DateTimeFormat.SHORT,
                      )}
                    </span>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h4">Code</Header>
                    <CodeEditor
                      style={{ maxHeight: 400 }}
                      value={detailedSub.code}
                      readOnly
                    />
                  </Grid.Column>
                </Grid.Row>
                {detailedResult && (
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h4">Result Log</Header>
                      <ResultLog
                        detailedResult={detailedResult}
                        scoringType={judge.config.scoringType}
                      />
                    </Grid.Column>
                  </Grid.Row>
                )}
              </Grid>
            </Modal.Content>
          </>
        )}
    </Modal>
  );
};

function useJudgeCompletionHandler(judge?: Judge, handler?: () => void) {
  const currentJudge = React.useRef<Judge | undefined>(judge);

  React.useEffect(() => {
    if (
      currentJudge.current &&
      InProgressJudge.isInstance(currentJudge.current) &&
      judge &&
      SuccessJudge.isInstance(judge)
    ) {
      handler?.();
    }
    currentJudge.current = judge;
  }, [judge]);
}
