import * as React from 'react';
import * as cherrio from 'cheerio';
import { Header, List } from 'semantic-ui-react';
import { HashLink } from 'react-router-hash-link';
import { slugifyHeading } from '../utils';
import { ArrayUtils } from '../../../utility';
import { Article } from '../../../domains/article';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';

export namespace ArticleContentTable {
  export interface Props {
    article: Article;
  }
  export type Node = RootNode | HeaderNode;

  export interface BaseNode {
    parent: Node | null;
    children: Node[];
    depth?: number;
  }

  export interface RootNode extends BaseNode {
    parent: null;
    children: HeaderNode[];
  }

  export interface HeaderNode extends BaseNode {
    id: string;
    parent: Node;
    children: HeaderNode[];
    label: string;
    depth?: number;
  }
}

export const ArticleContentTable: React.FC<ArticleContentTable.Props> = (
  props
) => {
  const { article } = props;

  const rootNode = React.useMemo(
    () => getContentTable(article.content),
    [article]
  );

  return (
    <>
      <Header as="h4">Mục lục</Header>
      <List size="medium" className="text-container" bulleted>
        {renderNode(rootNode)}
      </List>
    </>
  );
};

function renderNode(node: ArticleContentTable.Node) {
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

function getContentTable(content: string): ArticleContentTable.RootNode {
  const result: ArticleContentTable.RootNode = { parent: null, children: [] };
  let nearestNode: ArticleContentTable.Node = result;
  const tree = fromMarkdown(content);

  visit(tree, (node) => {
    if (node.type === 'heading') {
      let current: ArticleContentTable.Node | undefined = nearestNode;
      while (current) {
        if (current.parent == null || node.depth > Number(current?.depth)) {
          break;
        }
        current = current.parent;
      }
      const parentNode = current;
      const textNode = node.children[0];
      const label = textNode.type === 'text' ? textNode.value : '';

      const nextNode: ArticleContentTable.HeaderNode = {
        id: slugifyHeading(label),
        parent: parentNode,
        label,
        depth: node.depth,
        children: [],
      };
      parentNode.children.push(nextNode);
      nearestNode = nextNode;
    }
  });

  return result;
}
