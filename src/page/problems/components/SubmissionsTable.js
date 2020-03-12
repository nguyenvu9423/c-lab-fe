import * as React from 'react';
import { Table, Pagination } from 'semantic-ui-react';
import { SubmissionStatusLabel } from '../../submission/components/SubmissionStatusLabel';
import ArrayUtils from '../../../utility/ArrayUtils';
import { SubmissionService } from '../../../service/SubmissionService';
import { normalize } from 'normalizr';
import { submissionListSchema } from '../../../entitySchema/submissionSchema';
import { useDispatch } from 'react-redux';
import { updateEntity } from '../../../action/entity';
import { usePagination } from '../../common/pagination';
import { Link } from 'react-router-dom';

function SubmissionsTable(props) {
  const { submissions } = props;
  if (ArrayUtils.isEmpty(submissions)) {
    return null;
  }
  const dispatch = useDispatch();
  const {
    totalPages,
    activePage,
    setActivePage,
    firstIndex,
    lastIndex
  } = usePagination({ totalCount: submissions.length, countPerPage: 4 });

  const handlePageChange = React.useCallback(
    (event, { activePage }) => {
      setActivePage(activePage);
    },
    [setActivePage]
  );

  const activeSubmissions = React.useMemo(
    () => submissions.slice(firstIndex, lastIndex + 1),
    [submissions, firstIndex, lastIndex]
  );
  React.useEffect(() => {
    const streamedSubmissions = activeSubmissions.filter(
      sub => sub.progress.progressStatus.inProgress
    );
    if (!ArrayUtils.isEmpty(streamedSubmissions)) {
      const eventSource = SubmissionService.getStream(streamedSubmissions);
      eventSource.addEventListener('updateEntity', event => {
        const data = JSON.parse(event.data);
        const normalizedData = normalize(data, submissionListSchema);
        dispatch(updateEntity(normalizedData.entities));
      });
      eventSource.onerror = () => {
        eventSource.close();
      };
      return () => {
        eventSource.close();
      };
    }
  }, [JSON.stringify(activeSubmissions.map(sub => sub.id))]);

  return (
    <>
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Kết quả</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {activeSubmissions.map(submission => {
            return (
              <Table.Row key={submission.id}>
                <Table.Cell>
                  <Link>{submission.id}</Link>
                </Table.Cell>
                <Table.Cell>
                  <SubmissionStatusLabel submission={submission} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <div style={{ textAlign: 'center' }}>
        <Pagination
          size={'tiny'}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          boundaryRange={0}
          activePage={activePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export { SubmissionsTable };
