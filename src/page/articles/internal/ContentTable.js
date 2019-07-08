import * as React from 'react';
import { Header, List, Menu, Segment } from 'semantic-ui-react';
import { HashLink } from 'react-router-hash-link';
import { withRouter } from 'react-router';

class ContentTableHeading extends React.Component {
  render() {
    const { level, label, id } = this.props;
    return (
      <List.Item as={HashLink} to={`#${id}`} smooth>
        {level === 1 ? <Header as={'h3'}>{label}</Header> : label}
      </List.Item>
    );
  }
}

class BaseContentTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { structure } = this.props;
    if (structure == null) return null;
    return (
      <Segment>
        <List vertical fluid link size={'small'}>
          {structure.map((obj, index) => {
            return <ContentTableHeading key={index} {...obj} />;
          })}
        </List>
      </Segment>
    );
  }
}

export let ContentTable = withRouter(BaseContentTable);
