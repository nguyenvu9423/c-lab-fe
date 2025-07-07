import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  Header,
  Icon,
  Label,
  Message,
  Segment,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';
import { LoadingIndicator } from '@/components/loading-indicator';
import { ContestPageLink } from '@/domain-ui/contest';
import { UserPageLink } from '@/domain-ui/user';
import {
  fetchContests,
  fetchUserContestRegistrations,
  resetState,
} from '@/store/actions';
import { LoadingState } from '@/store/common';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { Target } from '@/store/reducers/target';
import { ContestSelectors, PrincipalSelectors } from '@/store/selectors';
import { State } from '@/store/state';
import { ContestRegistrationSelectors } from '@/store/selectors/ContestRegistrationSelectors';
import { SortDirection } from '@/shared/types';
import { ContestRegistrationButton } from '../components/ContestRegistrationButton';

export const UpcomingContestsSection: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.contestsPage);

  const principal = useSelector(PrincipalSelectors.principal());

  const loadContests = React.useCallback(() => {
    dispatch(
      fetchContests.request({
        query: 'end>=' + new Date().toISOString(),
        sort: [{ key: 'start', direction: SortDirection.ASC }],
        target: Target.ContestsPage.UPCOMING_CONTESTS,
      }),
    );
  }, [dispatch]);

  const upcomingContests = useSelector(
    data.upcomingContests.loadingState === LoadingState.LOADED
      ? ContestSelectors.byIds(data.upcomingContests.result)
      : () => undefined,
  );

  const loadUserRegistrations = React.useCallback(() => {
    if (data.upcomingContests.loadingState !== LoadingState.LOADED) return;
    if (principal?.id === undefined) return;

    dispatch(
      fetchUserContestRegistrations.request({
        type: 'byUserAndContests',
        contestIds: data.upcomingContests.result,
        userId: principal.id,
        pageable: { page: 0, size: data.upcomingContests.result.length },
      }),
    );
  }, [dispatch, data.upcomingContests, principal?.id]);

  const userRegistrations = useSelector(
    principal &&
      data.upcomingContests.loadingState === LoadingState.LOADED &&
      data.upcomingContestRegistrations.loadingState === LoadingState.LOADED
      ? ContestRegistrationSelectors.byUserAndContests(
          principal.id,
          data.upcomingContests.result,
        )
      : () => undefined,
  );

  React.useEffect(() => loadContests(), [loadContests, dispatch]);
  React.useEffect(
    () => loadUserRegistrations(),
    [loadUserRegistrations, dispatch],
  );

  React.useEffect(() => {
    return () => {
      dispatch(resetState({ target: Target.ContestsPage.UPCOMING_CONTESTS }));
    };
  }, [dispatch]);

  return (
    <>
      <Header as="h3" attached="top">
        Sắp diễn ra
      </Header>
      {!principal && upcomingContests?.length !== 0 && (
        <Message attached warning size="small">
          <Icon name="attention" />
          Hãy đăng nhập để tham gia kì thi
        </Message>
      )}
      <Segment attached>
        {DataHolder.isLoading(data.upcomingContests) && <LoadingIndicator />}
        {DataHolder.isLoaded(data.upcomingContests) &&
          upcomingContests &&
          (upcomingContests.length == 0 ? (
            'Chưa có kì thi sắp diễn ra'
          ) : (
            <Table basic fixed style={{ border: 'none' }}>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell width={3} textAlign="center">
                    Tên
                  </TableHeaderCell>
                  <TableHeaderCell width={2} textAlign="center">
                    Người tạo
                  </TableHeaderCell>
                  <TableHeaderCell width={2}>Bắt đầu</TableHeaderCell>
                  <TableHeaderCell width={1}>Thời gian</TableHeaderCell>
                  {principal && <Table.HeaderCell width={2}></Table.HeaderCell>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingContests.map((contest) => {
                  const { id, name, author, start, end } = contest;
                  return (
                    contest && (
                      <TableRow key={id} id={`contest-row-${id}`}>
                        <TableCell textAlign="center">
                          <ContestPageLink id={id}>{name}</ContestPageLink>
                        </TableCell>
                        <TableCell textAlign="center">
                          <UserPageLink
                            userId={author.id}
                            username={author.username}
                          />
                        </TableCell>
                        <TableCell>
                          {moment.utc(start).local().format('LLL')}
                        </TableCell>
                        <TableCell>
                          {moment.duration(moment(end).diff(start)).humanize()}
                        </TableCell>
                        {userRegistrations && principal && (
                          <TableCell>
                            {moment(start).isBefore(moment.now()) ? (
                              <Label color="blue" size="large">
                                <Icon name="hourglass half" />
                                Đang diễn ra
                              </Label>
                            ) : (
                              <ContestRegistrationButton
                                userId={principal.id}
                                contestId={contest.id}
                                value={userRegistrations.some(
                                  (registration) =>
                                    registration.contestId === contest.id,
                                )}
                              />
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  );
                })}
              </TableBody>
            </Table>
          ))}
      </Segment>
    </>
  );
};
