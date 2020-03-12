import * as React from 'react';
import { Header, List, Menu, Segment } from 'semantic-ui-react';
import { HashLink } from 'react-router-hash-link';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { from } from 'rxjs';
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

function BaseContentTable(props) {
  const { structure } = props;
  if (!structure) return null;
  let parsedStructure = React.useMemo(() => JSON.parse(structure), [structure]);
  return (
    <Segment>
      <List link size={'small'}>
        {parsedStructure.map((obj, index) => {
          return <ContentTableHeading key={index} {...obj} />;
        })}
      </List>
    </Segment>
  );
}
export let ContentTable = withRouter(BaseContentTable);
