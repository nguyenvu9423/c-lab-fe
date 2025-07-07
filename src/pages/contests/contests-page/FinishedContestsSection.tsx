import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Segment, Table } from 'semantic-ui-react';
import Lodash from 'lodash';
import moment from 'moment';

import { Pagination } from '@/components/index';
import { LoadingIndicator } from '@/components/loading-indicator';
import { ContestPageLink } from '@/domain-ui/contest';
import { UserPageLink } from '@/domain-ui/user';
import { SortDirection } from '@/shared/types';
import { fetchContests, resetState } from '@/store/actions';
import { LoadingState } from '@/store/common';
import { DataHolder } from '@/store/reducers/data-holders/shared';
import { Target } from '@/store/reducers/target';
import { ContestSelectors } from '@/store/selectors';
import { State } from '@/store/state';
import { PageUtils } from 'src/pages/shared';

const CONTESTS_PAGE_SIZE = 8;

export const FinishedContestsSection: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.contestsPage);
  const [page, setPage] = useState(1);

  const load = React.useCallback(() => {
    dispatch(
      fetchContests.request({
        query: 'end<' + new Date().toISOString(),
        pageable: { page, size: CONTESTS_PAGE_SIZE },
        sort: [{ key: 'end', direction: SortDirection.DESC }],
        target: Target.ContestsPage.FINISHED_CONTESTS,
      }),
    );
  }, [dispatch, page]);

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.ContestsPage.FINISHED_CONTESTS }));
    };
  }, [load, dispatch]);

  const finishedContests = useSelector(
    data.finishedContests.loadingState === LoadingState.LOADED
      ? ContestSelectors.byIds(data.finishedContests.result)
      : () => undefined,
  );

  const loadTotalPages = DataHolder.useTotalPages(data.finishedContests);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);
  PageUtils.useCorrectPage(page, totalPages);

  return (
    <>
      <Header as="h3" attached="top">
        Đã diễn ra
      </Header>
      <Segment attached style={{ minHeight: 420 }}>
        <Table basic fixed style={{ border: 'none' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3} textAlign="center">
                Tên
              </Table.HeaderCell>
              <Table.HeaderCell width={2} textAlign="center">
                Người tạo
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>Bắt đầu</Table.HeaderCell>
              <Table.HeaderCell width={1}>Thời gian</Table.HeaderCell>
              <Table.HeaderCell width={2} />
            </Table.Row>
          </Table.Header>
          {DataHolder.isLoading(data.finishedContests) && <LoadingIndicator />}
          {DataHolder.isLoaded(data.finishedContests) &&
            finishedContests &&
            finishedContests.map((contest) => {
              if (!contest) return undefined;
              const { id, name, author, start, end } = contest;
              return (
                contest && (
                  <Table.Row key={id}>
                    <Table.Cell textAlign="center">
                      <ContestPageLink id={id}>{name}</ContestPageLink>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <UserPageLink
                        userId={author.id}
                        username={author.username}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {moment.utc(start).local().format('LLL')}
                    </Table.Cell>
                    <Table.Cell>
                      {Lodash.capitalize(
                        moment
                          .duration(moment(end).diff(moment(start)))
                          .humanize(),
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`${contest.id}/scoreboard`}>Kết quả</Link>
                    </Table.Cell>
                  </Table.Row>
                )
              );
            })}
        </Table>
      </Segment>
      <Segment textAlign="center" attached>
        <Pagination
          activePage={page}
          totalPages={totalPages || 0}
          onPageChange={(_, { activePage }) => setPage(Number(activePage))}
          secondary
        />
      </Segment>
    </>
  );
};
