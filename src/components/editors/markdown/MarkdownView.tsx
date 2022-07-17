import * as React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Image } from 'semantic-ui-react';

export const MarkdownView: React.FC<{ components?: Components }> = (props) => {
  const components = React.useMemo(
    () =>
      props.components
        ? { ...baseComponents, ...props.components }
        : baseComponents,
    [props.components]
  );
  return (
    <ReactMarkdown
      className="markdown-container"
      remarkPlugins={[gfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={components}
    >
      {props.children as string}
    </ReactMarkdown>
  );
};

const MarkdownTable: React.FC = (props) => (
  <table className="ui table">{props.children}</table>
);

const ImageContainer: React.FC = (props) => {
  return <Image {...props} centered />;
};

const baseComponents: Components = {
  table: MarkdownTable,
  img: ImageContainer,
};
