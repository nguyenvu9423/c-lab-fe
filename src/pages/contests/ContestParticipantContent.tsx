import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Pagination, Segment, Table } from 'semantic-ui-react';

import { DataHolder } from '@/store/reducers/data-holders/shared';
import { fetchUserContestRegistrations } from '@/store/actions';
import { LoadingState } from '@/store/common';
import { ContestRegistrationSelectors } from '@/store/selectors/ContestRegistrationSelectors';
import { UserContestRegistration } from '@/domains/contest';
import { State } from '@/store/state';

import { BaseContestContentProps } from './shared';
import { ContestInfoCard } from './components';
import { PageUtils } from '../shared';
import { EmptyTableBody } from '../../components/table/EmptyTableBody';

export namespace ContestParticipantContent {
  export interface Props extends BaseContestContentProps {}
}

const PAGE_SIZE = 12;

export const ContestParticipantContent: React.FC<
  ContestParticipantContent.Props
> = (props) => {
  const { contest, nav } = props;
  const dispatch = useDispatch();
  const { data } = useSelector(
    (state: State) => state.contestPageContents.participants,
  );
  const [page, setPage] = useState(1);

  const loadUserRegistrations = React.useCallback(() => {
    dispatch(
      fetchUserContestRegistrations.request({
        type: 'byContest',
        contestId: contest.id,
        pageable: { page, size: PAGE_SIZE },
      }),
    );
  }, [dispatch, contest.id, page]);

  React.useEffect(
    () => loadUserRegistrations(),
    [loadUserRegistrations, dispatch],
  );

  const userRegistrations = useSelector(
    data.registrations.loadingState === LoadingState.LOADED
      ? ContestRegistrationSelectors.byIds(data.registrations.result)
      : () => undefined,
  );

  const loadTotalPages = DataHolder.useTotalPages(data.registrations);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);
  PageUtils.useCorrectPage(page, totalPages);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={12}>
          {nav}
          <Header as="h4" attached="top">
            Thí sinh
          </Header>
          <Segment attached style={{ minHeight: 500 }}>
            <Table basic fixed singleLine style={{ border: 'none' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={2}>#</Table.HeaderCell>
                  <Table.HeaderCell width={14}>Thí sinh</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              {userRegistrations && userRegistrations.length > 0 ? (
                <Table.Body>
                  {userRegistrations
                    .filter(
                      (registration): registration is UserContestRegistration =>
                        !!registration,
                    )
                    .map((registration, index) => (
                      <Table.Row key={registration.user.id}>
                        <Table.Cell>{index}</Table.Cell>
                        <Table.Cell>
                          <Link to="#">{registration.user.username}</Link>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              ) : (
                <EmptyTableBody
                  icon="clipboard outline"
                  content="Chưa có thí sinh đăng kí"
                />
              )}
            </Table>
          </Segment>
          <Segment textAlign="center" attached>
            <Pagination
              activePage={page}
              totalPages={totalPages || 0}
              onPageChange={(_event, { activePage }) =>
                setPage(Number(activePage))
              }
              secondary
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <ContestInfoCard contest={contest} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
