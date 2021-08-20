// import * as React from 'react';
// import { Pagination } from 'semantic-ui-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSubmissions } from '../../store/actions/submission';
// import { SubmissionSelectors } from '../../store/selectors/SubmissionSelectors';
// import { Target } from '../../store/reducers/target';
// import { LoadingState } from '../../store/common';
// import { LoadingIndicator } from '../../components/loading-indicator';
// import { SubmissionsTable } from './components/SubmissionsTable';
// import { useJudgesStream } from '../../domains/judge';
// import { Problem } from '../../domains/problem';
// import { State } from '../../store';
// import { Submission } from '../../domains/submission';
// import { Pageable } from '../../utility';

// export namespace ProblemStatusPage {
//   export interface Props {
//     problem: Problem;
//     query?: string;
//   }
// }

// const PAGE_SIZE = 10;

// const initialPageable: Pageable = {
//   page: 0,
//   size: PAGE_SIZE,
// };

// export const ProblemStatusPage: React.FC<ProblemStatusPage.Props> = (props) => {
//   const { problem, query } = props;
//   const dispatch = useDispatch();
//   const { data } = useSelector((state: State) => state.problemSubmissions);

//   const currentPageable =
//     data.submissions.loadingState === LoadingState.LOAD_NEEDED
//       ? initialPageable
//       : data.submissions.pageable;

//   const load = React.useCallback(
//     (params: { pageable?: Pageable } = {}) => {
//       const pageable = params.pageable ?? currentPageable;
//       const target = Target.PROBLEM_SUBMISSIONS;
//       if (query) {
//         dispatch(
//           fetchSubmissions.request({
//             type: 'byProblemAndQuery',
//             problemId: problem.id,
//             query,
//             pageable,
//             target,
//           })
//         );
//       } else {
//         dispatch(
//           fetchSubmissions.request({
//             type: 'byProblem',
//             problemId: problem.id,
//             pageable,
//             target,
//           })
//         );
//       }
//     },
//     [problem, query, currentPageable]
//   );

//   React.useEffect(() => {
//     load();
//   }, [query]);

//   const handlePageChange = React.useCallback(
//     (event, { activePage }) => {
//       load({ pageable: { page: activePage - 1, size: PAGE_SIZE } });
//     },
//     [load]
//   );

//   const submissions = useSelector(
//     data.submissions.loadingState === LoadingState.LOADED
//       ? SubmissionSelectors.byIds(data.submissions.ids)
//       : () => undefined
//   );

//   useJudgesStream(
//     submissions
//       ? submissions
//           .filter((sub): sub is Submission => sub !== undefined)
//           .map((sub) => sub.judge)
//       : []
//   );

//   if (data.submissions.loadingState === LoadingState.LOADING) {
//     return (
//       <div style={{ minHeight: 150 }}>
//         <LoadingIndicator />
//       </div>
//     );
//   }

//   return (
//     <>
//       <SubmissionsTable submissions={submissions ?? []} />
//       <div style={{ textAlign: 'center' }}>
//         <Pagination
//           size={'tiny'}
//           ellipsisItem={null}
//           firstItem={null}
//           lastItem={null}
//           boundaryRange={0}
//           activePage={currentPageable.page + 1}
//           totalPages={data.submissions?.totalPages ?? currentPageable.page + 1}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </>
//   );
// };
