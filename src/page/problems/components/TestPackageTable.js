import * as React from 'react';
import { Table, Checkbox, Dimmer, Loader, Pagination } from 'semantic-ui-react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { TestPackageSelectors } from '../../../store/selectors/TestPackageSelectors';

function TestPackageTable(props) {
  const {
    ids,
    activeId,
    onActiveIdChange,
    totalPages,
    pageNumber,
    onPageChange
  } = props;
  const testPackages = useSelector(TestPackageSelectors.byIds(ids));
  const rows = React.useMemo(() => {
    return testPackages.map(testPackage => {
      const {
        id,
        originalFileName,
        size,
        inputFileName,
        outputFileName,
        createdAt
      } = testPackage;
      const isActive = id === activeId;
      return (
        <Table.Row
          key={id}
          active={isActive}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (onActiveIdChange) onActiveIdChange(testPackage.id);
          }}
        >
          <Table.Cell>{originalFileName}</Table.Cell>
          <Table.Cell>{size}</Table.Cell>
          <Table.Cell>{moment.utc(createdAt).format('LLL')}</Table.Cell>
          <Table.Cell>
            {inputFileName}/{outputFileName}
          </Table.Cell>
          <Table.Cell>
            <Checkbox checked={isActive} />
          </Table.Cell>
        </Table.Row>
      );
    });
  }, [ids, activeId]);

  return (
    <Table selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Tên file</Table.HeaderCell>
          <Table.HeaderCell>Dung lượng</Table.HeaderCell>
          <Table.HeaderCell>Thời điểm tải</Table.HeaderCell>
          <Table.HeaderCell>Input/Output</Table.HeaderCell>
          <Table.HeaderCell>Chọn</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{rows}</Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="5">
            <div>
              <Pagination
                size="tiny"
                floated="right"
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                boundaryRange={0}
                activePage={pageNumber + 1}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}

export { TestPackageTable };
