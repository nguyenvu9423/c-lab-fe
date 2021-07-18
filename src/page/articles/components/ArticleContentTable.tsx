import * as React from 'react';
import { Header, List } from 'semantic-ui-react';
import { ArticleUtils, ContentTable } from '../utils';
import ArrayUtils from '../../../utility/ArrayUtils';
import { HashLink } from 'react-router-hash-link';
import { Article } from '../../../domains/article';

export namespace ArticleContentTable {
  export interface Props {
    article: Article;
  }
}

export const ArticleContentTable: React.FC<ArticleContentTable.Props> = (
  props
) => {
  const { article } = props;
  const rootNode = React.useMemo(
    () => ArticleUtils.getContentTable(article.content),
    [article]
  );

  return (
    <>
      <Header as="h4">Table of contents</Header>
      <List size="medium" className="text-container" bulleted>
        {renderNode(rootNode)}
      </List>
    </>
  );
};

function renderNode(node: ContentTable.Node) {
  const renderedChildren = !ArrayUtils.isEmpty(node.children)
    ? node.children.map((child) => renderNode(child))
    : null;
  if (!node.parent) {
    return renderedChildren;
  } else {
    return (
      <List.Item key={node.id}>
        <HashLink to={`#${node.id}`}>{node.label}</HashLink>
        {renderedChildren && <List.List>{renderedChildren}</List.List>}
      </List.Item>
    );
  }
}
