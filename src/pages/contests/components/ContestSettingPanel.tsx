import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Header } from 'semantic-ui-react';
import { Contest } from '@/domains/contest';

export namespace ContestSettingPanel {
  export interface Props {
    contest: Contest;
  }
}

export const ContestSettingPanel: React.FC<ContestSettingPanel.Props> = (
  props,
) => {
  const { contest } = props;
  return (
    <div className="clear-fix-container">
      <Header as="h3" floated="left">
        Cài đặt
      </Header>
      <ButtonGroup>
        <Button
          floated="right"
          content="Sửa"
          icon="edit"
          as={Link}
          to={`/contests/${contest.id}/edit`}
        />
      </ButtonGroup>
    </div>
  );
};
