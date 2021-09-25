import * as React from 'react';
import * as cherrio from 'cheerio';
import { Header, List } from 'semantic-ui-react';
import { HashLink } from 'react-router-hash-link';
import { slugifyHeading } from '../utils';
import { ArrayUtils } from '../../../utility';
import { Article } from '../../../domains/article';

export namespace ArticleContentTable {
  export interface Props {
    article: Article;
  }
  export type Node = RootNode | HeaderNode;

  export interface BaseNode {
    parent: Node | null;
    children: Node[];
    tagName?: string;
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
    tagName: string;
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
      <Header as="h4">Table of contents</Header>
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

function getContentTable(str: string): ArticleContentTable.RootNode {
  const result: ArticleContentTable.RootNode = { parent: null, children: [] };
  let nearestNode: ArticleContentTable.Node = result;
  const $ = cherrio.load(str);
  $('h2,h3,h4').each((index, element) => {
    if (element.type !== 'tag') return;

    const id = slugifyHeading($(element).text());
    let current: ArticleContentTable.Node | undefined = nearestNode;

    while (current) {
      if (current.parent === null || element.tagName > current.tagName) {
        break;
      }
      current = current.parent;
    }

    const parentNode = current;
    const node: ArticleContentTable.HeaderNode = {
      id,
      parent: parentNode,
      label: $(element).text(),
      tagName: element.tagName,
      children: [],
    };
    parentNode.children.push(node);
    nearestNode = node;
  });

  return result;
}
