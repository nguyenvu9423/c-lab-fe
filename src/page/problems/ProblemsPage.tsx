import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Table, Segment, Grid } from 'semantic-ui-react';
import QueryString from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import { fetchProblems } from '../../store/actions/problem';
import { PrincipalSelectors, ProblemSelectors } from '../../store/selectors';
import { LoadingState } from '../../store/common';
import { TagFilterCard, Pagination } from '../../components';
import { Target } from '../../store/reducers/target';
import { resetState } from '../../store/actions/state';
import { State } from '../../store/state';
import { DataHolder } from '../../store/reducers/data-holders/shared';
import { RsqlUtils } from '../../utility';
import { AcceptedLabel } from '../../domains/judge';
import { ErrorTableBody, LoadingTableBody } from '../../components/table';
import { useScrollToTop } from '../../common/hooks';
import { ProblemPageLink } from './problem-page/ProblemPageLink';
import { PageUtils } from '../shared';
import { OnlyNameTag } from '../../domains/tag';

const PROBLEMS_PAGE_SIZE = 14;

export const ProblemsPage: React.FC = () => {
  useScrollToTop();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const principal = useSelector(PrincipalSelectors.principal());
  const dispatch = useDispatch();

  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') ?? undefined;

  const { data } = useSelector((state: State) => state.problemsPage);
  const loadTotalPages = DataHolder.useTotalPages(data.problems);
  const totalPages = PageUtils.useTotalPages(loadTotalPages);

  PageUtils.useCorrectPage(page, totalPages);

  const load = React.useCallback(() => {
    dispatch(
      fetchProblems.request({
        pageable: { page, size: PROBLEMS_PAGE_SIZE },
        query,
        target: Target.PROBLEMS_PAGE,
      })
    );
  }, [dispatch, page, query]);

  const problems = useSelector(
    data.problems.loadingState === LoadingState.LOADED
      ? ProblemSelectors.byIds(data.problems.result)
      : () => undefined
  );

  const handlePageChange = React.useCallback(
    (event, { activePage }) => {
      navigate({ search: QueryString.stringify({ page: activePage, query }) });
    },
    [query, navigate]
  );

  const handleFilterChange = React.useCallback(
    (tags) => {
      const newQuery =
        tags.length > 0
          ? RsqlUtils.emit(
              RsqlUtils.Builder.comparison(
                'tags',
                '=include=',
                tags.map((tag) => tag.name)
              )
            )
          : undefined;
      navigate({ search: QueryString.stringify({ page, query: newQuery }) });
    },
    [page, navigate]
  );

  React.useEffect(() => {
    load();
    return () => {
      dispatch(resetState({ target: Target.PROBLEMS_PAGE }));
    };
  }, [load, dispatch]);

  const initialTags: OnlyNameTag[] = React.useMemo(
    () => (query ? PageUtils.getTagsFromQuery(query) : []),
    []
  );

  return (
    <>
      <Helmet>
        <title>Bài tập</title>
      </Helmet>
      <Grid container stackable doubling columns={2}>
        <Grid.Column width={12}>
          <Segment.Group>
            <Segment style={{ minHeight: 648, padding: 0 }}>
              <Table basic fixed singleLine style={{ border: 'none' }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={2}>ID</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Mã bài</Table.HeaderCell>
                    <Table.HeaderCell width={6}>Tiêu đề</Table.HeaderCell>
                    {principal && (
                      <Table.HeaderCell width={2}>Đã giải</Table.HeaderCell>
                    )}
                  </Table.Row>
                </Table.Header>
                {DataHolder.isLoading(data.problems) && <LoadingTableBody />}
                {DataHolder.isLoaded(data.problems) && problems && (
                  <Table.Body>
                    {problems.map((problem) => (
                      <Table.Row key={problem.id}>
                        <Table.Cell>
                          <ProblemPageLink code={problem.code}>
                            {problem.id}
                          </ProblemPageLink>
                        </Table.Cell>
                        <Table.Cell>
                          <ProblemPageLink code={problem.code} />
                        </Table.Cell>
                        <Table.Cell>{problem.title}</Table.Cell>

                        {principal && (
                          <Table.Cell>
                            {problem.solvedByPrincipal && <AcceptedLabel />}
                          </Table.Cell>
                        )}
                      </Table.Row>
                    ))}
                  </Table.Body>
                )}
                {DataHolder.isError(data.problems) && (
                  <ErrorTableBody message={data.problems.error.message} />
                )}
              </Table>
            </Segment>
            <Segment textAlign="center">
              <Pagination
                activePage={page}
                totalPages={totalPages || 0}
                onPageChange={handlePageChange}
              />
            </Segment>
          </Segment.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <TagFilterCard
            initialTags={initialTags}
            onSubmit={handleFilterChange}
          />
        </Grid.Column>
      </Grid>
    </>
  );
};
