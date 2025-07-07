import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useMatch,
  useParams,
} from 'react-router-dom';
import { Divider, Grid, Menu } from 'semantic-ui-react';
import moment from 'moment';

import { LoadingIndicator } from '@/components/loading-indicator';
import {
  fetchContest,
  fetchUserContestRegistration,
  resetState,
} from '@/store/actions';
import { LoadingState } from '@/store/common';
import { DataHolderState } from '@/store/reducers/data-holders/shared';
import { Target } from '@/store/reducers/target';
import {
  AuthorizationSelectors,
  ContestSelectors,
  PrincipalSelectors,
} from '@/store/selectors';
import { State } from '@/store/state';
import { ContestSubmitContent } from './ContestSubmitContent';
import { ContestProblemsContent } from './ContestProblemsContent';
import { ContestProblemContent } from './ContestProblemContent';
import { ContestSubmissionContent } from './ContestSubmissionsContent';
import { PrincipalProblemSubsContent } from './PrincipalContestSubsContent';
import { ContestScoreboardContent } from './ContestScoreboardContent';
import { Contest } from '@/domains/contest';
import { ContestIntroContent } from './ContestIntroContent';
import { ContestParticipantContent } from './ContestParticipantContent';
import { ContestSettingPanel } from './components/ContestSettingPanel';

export const ContestPage: React.FC = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const loadContest = useCallback(() => {
    dispatch(
      fetchContest.request({
        type: 'byId',
        id: Number(id),
        target: Target.CONTEST_PAGE,
      }),
    );
  }, [dispatch, id]);

  const principal = useSelector(PrincipalSelectors.principal());

  const loadPrincipalRegistration = useCallback(() => {
    if (principal) {
      dispatch(
        fetchUserContestRegistration.request({
          contestId: Number(id),
          userId: principal.id,
          target: Target.CONTEST_PAGE,
        }),
      );
    }
  }, [dispatch, id, principal?.id]);

  const { data } = useSelector((state: State) => state.contestPage);

  const contest = useSelector(
    data.contest.loadingState === LoadingState.LOADED
      ? ContestSelectors.byId(data.contest.id)
      : () => undefined,
  );

  useEffect(() => {
    loadContest();
    loadPrincipalRegistration();
    return () => {
      dispatch(resetState({ target: Target.CONTEST_PAGE }));
    };
  }, [id, principal?.id]);

  const now = moment();

  React.useEffect(() => {
    if (!contest) return;

    const startMoment = moment(contest.start);
    const endMoment = moment(contest.end);

    const startTimeoutId = startMoment.isAfter(now)
      ? setTimeout(loadContest, startMoment.diff(now, 'milliseconds'))
      : undefined;

    const endTimeoutId = endMoment.isAfter(now)
      ? setTimeout(loadContest, endMoment.diff(now, 'milliseconds'))
      : undefined;

    return () => {
      if (startTimeoutId) clearTimeout(startTimeoutId);
      if (endTimeoutId) clearTimeout(endTimeoutId);
    };
  }, [contest]);

  const canUpdateContest = useSelector(
    contest ? AuthorizationSelectors.canUpdateContest(contest) : () => false,
  );

  return (
    <Grid container doubling stackable columns={2}>
      {DataHolderState.isLoading(data.contest) && (
        <Grid.Row>
          <LoadingIndicator />
        </Grid.Row>
      )}
      {DataHolderState.isLoaded(data.contest) && contest && (
        <>
          {canUpdateContest && (
            <Grid.Row>
              <Grid.Column floated="right" textAlign="right" width="16">
                <ContestSettingPanel contest={contest} />
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column width={16}>
              {now.isBefore(contest.start) ? (
                <IncomingContestRoutes contest={contest} />
              ) : now.isAfter(contest.end) ? (
                <FinishedContestRoutes contest={contest} />
              ) : (
                <OnGoingContestRoutes contest={contest} />
              )}
            </Grid.Column>
          </Grid.Row>
        </>
      )}
    </Grid>
  );
};

const IncomingContestRoutes: React.FC<{ contest: Contest }> = (props) => {
  const { contest } = props;
  const { params } = useMatch({ path: 'contests/:id/:section/*' }) ?? {};
  const url = `/contests/${params?.id}`;

  const nav = (
    <Menu size="large" stackable>
      <Menu.Item
        as={Link}
        to={`${url}/intro`}
        active={params?.section === 'intro'}
      >
        Giới thiệu
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`${url}/participants`}
        active={params?.section === 'participants'}
      >
        Thí sinh
      </Menu.Item>
    </Menu>
  );

  return (
    <Routes>
      <Route
        path="intro/*"
        element={<ContestIntroContent contest={contest} nav={nav} />}
      />
      <Route
        path="participants/*"
        element={<ContestParticipantContent contest={contest} nav={nav} />}
      />
      <Route path="*" element={<Navigate to="intro" replace />} />
    </Routes>
  );
};

const OnGoingContestRoutes: React.FC<{ contest: Contest }> = (props) => {
  const { contest } = props;
  const { params } = useMatch({ path: 'contests/:id/:section/*' }) ?? {};
  const url = `/contests/${params?.id}`;
  const nav = (
    <Menu size="large" stackable>
      <Menu.Item
        as={Link}
        to={`${url}/intro`}
        active={params?.section === 'intro'}
      >
        Giới thiệu
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`${url}/problems`}
        active={params?.section === 'problems' || params?.section === undefined}
      >
        Đề bài
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`${url}/submit`}
        active={params?.section === 'submit'}
      >
        Nộp bài
      </Menu.Item>
      <Menu.Item as={Link} to={`${url}/my`} active={params?.section === 'my'}>
        Bài nộp của bạn
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`${url}/submissions`}
        active={params?.section === 'submissions'}
      >
        Tất cả bài nộp
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`${url}/scoreboard`}
        active={params?.section === 'scoreboard'}
      >
        Bảng điểm
      </Menu.Item>
    </Menu>
  );

  return (
    <Routes>
      <Route
        path="intro/*"
        element={<ContestIntroContent contest={contest} nav={nav} />}
      />
      <Route
        path="problems"
        element={<ContestProblemsContent contest={contest} nav={nav} />}
      />
      <Route
        path="problems/:code"
        element={<ContestProblemContent contest={contest} nav={nav} />}
      />
      <Route
        path="submit/*"
        element={<ContestSubmitContent contest={contest} nav={nav} />}
      />
      <Route
        path="my/*"
        element={<PrincipalProblemSubsContent contest={contest} nav={nav} />}
      />
      <Route
        path="submissions/*"
        element={<ContestSubmissionContent contest={contest} nav={nav} />}
      />
      <Route
        path="scoreboard/*"
        element={<ContestScoreboardContent contest={contest} nav={nav} />}
      />
      <Route path="*" element={<Navigate to="problems" replace />} />
    </Routes>
  );
};

const FinishedContestRoutes: React.FC<{ contest: Contest }> = (props) => {
  const { contest } = props;
  const { params } = useMatch({ path: 'contests/:id/:section/*' }) ?? {};
  const url = `/contests/${params?.id}`;

  const nav = (
    <Menu size="large" stackable>
      <Menu.Item
        as={Link}
        to={`${url}/intro`}
        active={params?.section === 'intro'}
      >
        Giới thiệu
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`${url}/problems`}
        active={params?.section === 'problems' || params?.section === undefined}
      >
        Đề bài
      </Menu.Item>
      <Menu.Item as={Link} to={`${url}/my`} active={params?.section === 'my'}>
        Bài nộp của bạn
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`${url}/submissions`}
        active={params?.section === 'submissions'}
      >
        Tất cả bài nộp
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={`${url}/scoreboard`}
        active={params?.section === 'scoreboard'}
      >
        Bảng điểm
      </Menu.Item>
    </Menu>
  );

  return (
    <Routes>
      <Route
        path="intro/*"
        element={<ContestIntroContent contest={contest} nav={nav} />}
      />
      <Route
        path="problems"
        element={<ContestProblemsContent contest={contest} nav={nav} />}
      />
      <Route
        path="problems/:code"
        element={<ContestProblemContent contest={contest} nav={nav} />}
      />
      <Route
        path="my/*"
        element={<PrincipalProblemSubsContent contest={contest} nav={nav} />}
      />
      <Route
        path="submissions/*"
        element={<ContestSubmissionContent contest={contest} nav={nav} />}
      />
      <Route
        path="scoreboard/*"
        element={<ContestScoreboardContent contest={contest} nav={nav} />}
      />
      <Route path="*" element={<Navigate to="problems" replace />} />
    </Routes>
  );
};
