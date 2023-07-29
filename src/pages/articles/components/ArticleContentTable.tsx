import * as React from 'react';
import { Header, List } from 'semantic-ui-react';
import { HashLink } from 'react-router-hash-link';
import { slugifyHeading } from '../utils';
import { ArrayUtils } from '@/utils';
import { RawDraftContentState } from 'draft-js';

export namespace ArticleContentTable {
  export interface Props {
    contentState: RawDraftContentState;
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
  props,
) => {
  const { contentState } = props;

  const rootNode = React.useMemo(
    () => getContentTable(contentState),
    [contentState],
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

function getContentTable(
  content: RawDraftContentState,
): ArticleContentTable.RootNode {
  const result: ArticleContentTable.RootNode = { parent: null, children: [] };
  let nearestNode: ArticleContentTable.Node = result;

  content.blocks.forEach((block) => {
    if (block.type.startsWith('header')) {
      let current: ArticleContentTable.Node | undefined = nearestNode;
      const depth = getHeaderDepth(block.type);
      while (current) {
        if (current.parent == null || depth > Number(current?.depth)) {
          break;
        }
        current = current.parent;
      }
      const parentNode = current;
      const label = block.text;

      const nextNode: ArticleContentTable.HeaderNode = {
        id: slugifyHeading(label, block.key),
        parent: parentNode,
        label,
        depth,
        children: [],
      };
      parentNode.children.push(nextNode);
      nearestNode = nextNode;
    }
  });

  return result;
}

function getHeaderDepth(type: string): number {
  switch (type) {
    case 'header-one':
      return 1;
    case 'header-two':
      return 2;
    case 'header-three':
      return 3;
  }
  return 0;
}
