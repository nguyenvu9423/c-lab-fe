import * as React from 'react';
import { Components } from 'react-markdown';
import { HeadingProps } from 'react-markdown/lib/ast-to-react';
import { MarkdownView } from '../../../components';
import { slugifyHeading } from '../utils';

export const ArticleMarkdownView: React.FC<{ children?: React.ReactNode }> = (props) => {
  return (
    <MarkdownView components={anchorHeadingComponents}>
      {props.children}
    </MarkdownView>
  );
};

const AnchorHeading: React.FC<HeadingProps> = (props) => {
  const textNode = props.node.children[0];
  const label = textNode.type === 'text' ? textNode.value : '';
  const id = slugifyHeading(label);
  const TagName = `h${props.level + 1}` as any;

  return (
    <TagName>
      <span className="anchor-tag" id={id}>
        <a href={`#${id}`}>#</a>
      </span>
      {props.children}
    </TagName>
  );
};

const anchorHeadingComponents: Components = {
  h1: AnchorHeading,
  h2: AnchorHeading,
  h3: AnchorHeading,
  h4: AnchorHeading,
  h5: AnchorHeading,
  h6: AnchorHeading,
};
