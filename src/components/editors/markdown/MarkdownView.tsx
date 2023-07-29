import * as React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Image } from 'semantic-ui-react';

export const MarkdownView: React.FC<{
  components?: Components;
  children?: React.ReactNode;
}> = (props) => {
  const components = React.useMemo(
    () =>
      props.components
        ? { ...baseComponents, ...props.components }
        : baseComponents,
    [props.components],
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

const MarkdownTable: React.FC<{ children?: React.ReactNode }> = (props) => (
  <table className="ui table">{props.children}</table>
);

const ImageContainer: React.FC = (props) => {
  return <Image {...props} centered />;
};

//TODO: re-enable
//table: MarkdownTable,

const baseComponents: Components = {
  img: ImageContainer,
};
