import * as React from 'react';
import { Header, List } from 'semantic-ui-react';
import { ArticleUtility } from '../../../utility/TextUtility';
import ArrayUtils from '../../../utility/ArrayUtils';
import { HashLink } from 'react-router-hash-link';

function renderNode(node) {
  const renderedChildren = !ArrayUtils.isEmpty(node.children)
    ? node.children.map((child) => renderNode(child))
    : null;
  if (!node.parent) {
    return renderedChildren;
  } else {
    return (
      <List.Item>
        <HashLink to={`#${node.id}`}>{node.label}</HashLink>
        {renderedChildren && <List.List>{renderedChildren}</List.List>}
      </List.Item>
    );
  }
}

export function ContentTable(props) {
  const { article } = props;
  const rootNode = React.useMemo(
    () => ArticleUtility.getContentTable(article.content),
    [article]
  );

  return (
    <>
      <Header as="h4">Table of contents</Header>
      <List size={'medium'} className={'text-container'} bulleted>
        {renderNode(rootNode)}
      </List>
    </>
  );
}
