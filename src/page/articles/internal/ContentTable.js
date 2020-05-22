import * as React from 'react';
import { Header, List } from 'semantic-ui-react';
import { HashLink } from 'react-router-hash-link';
import { withRouter } from 'react-router';

class ContentTableHeading extends React.Component {
  render() {
    const { level, label, id } = this.props;
    return (
      <List.Item as={HashLink} to={`#${id}`} smooth>
        {label}
      </List.Item>
    );
  }
}

function BaseContentTable(props) {
  const { structure } = props;
  if (!structure) return null;
  let parsedStructure = React.useMemo(() => JSON.parse(structure), [structure]);
  return (
    <>
      <Header as="h4" style={{ textTransform: 'uppercase' }}>
        Contents
      </Header>
      <List bulleted link size={'medium'} className={'text-container'}>
        {/* {parsedStructure.map((obj, index) => {
          return <ContentTableHeading key={index} {...obj} />;
        })} */}
        <List.Item>Gaining Access</List.Item>
        <List.Item>Inviting Friends</List.Item>
        <List.Item>
          Benefits
          <List.List>
            <List.Item>Link to somewhere</List.Item>
            <List.Item>Rebates</List.Item>
            <List.Item>Discounts</List.Item>
          </List.List>
        </List.Item>
        <List.Item>Warranty</List.Item>
      </List>
    </>
  );
}
export let ContentTable = withRouter(BaseContentTable);
