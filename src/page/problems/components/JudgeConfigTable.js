import * as React from 'react';
import { Table, Checkbox, Segment } from 'semantic-ui-react';
import moment from 'moment';
import { TableContainer } from '../../../components/table/TableContainer';
import { Pagination } from '../../../components';

function JudgeConfigTable(props) {
  const {
    judgeConfigs,
    activeJudgeConfig,
    onActiveJudgeConfigChange,
    totalPages,
    activePage,
    onPageChange,
    loading
  } = props;

  return (
    <>
      <Segment attached="top" style={{ padding: 0 }}>
        <TableContainer
          loading={loading}
          style={{ height: 267, marginBottom: 14 }}
        >
          <Table selectable style={{ border: 'none' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Tên file</Table.HeaderCell>
                <Table.HeaderCell>Dung lượng</Table.HeaderCell>
                <Table.HeaderCell>Thời điểm tải</Table.HeaderCell>
                <Table.HeaderCell>Input/Output</Table.HeaderCell>
                <Table.HeaderCell>Chọn</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {judgeConfigs.map(judgeConfig => {
                const isActive = judgeConfig.id === activeJudgeConfig.id;
                return (
                  <Table.Row
                    key={judgeConfig.id}
                    active={isActive}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      onActiveJudgeConfigChange?.(judgeConfig);
                    }}
                  >
                    <Table.Cell>{judgeConfig.originalFileName}</Table.Cell>
                    <Table.Cell>{judgeConfig.size}</Table.Cell>
                    <Table.Cell>
                      {moment.utc(judgeConfig.createdAt).format('LLL')}
                    </Table.Cell>
                    <Table.Cell>
                      {judgeConfig.inputFileName}/{judgeConfig.outputFileName}
                    </Table.Cell>
                    <Table.Cell>
                      <Checkbox checked={isActive} />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </TableContainer>
      </Segment>
      <Segment clearing attached="bottom">
        <Pagination
          floated="right"
          totalPages={totalPages}
          activePage={activePage}
          onPageChange={onPageChange}
        />
      </Segment>
    </>
  );
}

export { JudgeConfigTable };
