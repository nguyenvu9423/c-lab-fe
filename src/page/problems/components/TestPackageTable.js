import * as React from 'react';
import { Table, Checkbox, Dimmer, Loader } from 'semantic-ui-react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { TestPackageSelectors } from '../../../store/selectors/TestPackageSelectors';

function TestPackageTable(props) {
  const { testPackageIds, activeTestPackageId, onSetActiveTestPackage } = props;
  const testPackages = useSelector(TestPackageSelectors.byIds(testPackageIds));

  const rows = React.useMemo(() => {
    if (!testPackages) {
      <Dimmer active inverted>
        <Loader size="medium">Loading</Loader>
      </Dimmer>;
    }
    return testPackages.map(testPackage => {
      const {
        id,
        originalFileName,
        size,
        inputFileName,
        outputFileName,
        createdAt
      } = testPackage;
      const isActive = id === activeTestPackageId;
      return (
        <Table.Row
          key={id}
          active={isActive}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (onSetActiveTestPackage) onSetActiveTestPackage(testPackage.id);
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
  }, [testPackageIds, activeTestPackageId]);
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
    </Table>
  );
}

export { TestPackageTable };
