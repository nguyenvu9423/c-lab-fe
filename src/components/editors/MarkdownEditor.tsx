import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import classNames from 'classnames';

import { Button, Divider } from 'semantic-ui-react';
import { EditorState, Editor, ContentState } from 'draft-js';
import { Components } from 'react-markdown';

import { Styleable } from '../../common/types';
import { slugifyHeading } from '../../page/articles/utils';
import { HeadingProps } from 'react-markdown/lib/ast-to-react';

export namespace MarkdownEditor {
  export interface Props extends Styleable {
    initialValue?: string;
    onChange?(value: string): void;
  }
}

export const MarkdownEditor: React.FC<MarkdownEditor.Props> = (props) => {
  const { initialValue } = props;
  const editorRef = React.useRef<Editor | null>(null);

  const [editorState, setEditorState] = React.useState(
    initialValue
      ? EditorState.createWithContent(ContentState.createFromText(initialValue))
      : EditorState.createEmpty()
  );

  const [selectedTab, setSelectedTab] = React.useState('write');

  return (
    <div className={classNames(props.className, 'markdown-editor')}>
      <Button.Group>
        <Button
          type="button"
          active={selectedTab === 'write'}
          onClick={() => setSelectedTab('write')}
          icon="edit"
          content="Write"
        />
        <Button
          type="button"
          active={selectedTab == 'preview'}
          onClick={() => setSelectedTab('preview')}
          icon="eye"
          content="Preview"
        />
      </Button.Group>

      <Divider />
      {selectedTab === 'write' ? (
        <div className="content" onClick={() => editorRef.current?.focus()}>
          <Editor
            ref={editorRef}
            editorState={editorState}
            onChange={setEditorState}
            onBlur={() =>
              props.onChange?.(editorState.getCurrentContent().getPlainText())
            }
            stripPastedStyles={true}
          />
        </div>
      ) : (
        <div className="preview">
          <MarkdownView>
            {editorState.getCurrentContent().getPlainText()}
          </MarkdownView>
        </div>
      )}
    </div>
  );
};

export const MarkdownView: React.FC<{ children: string }> = ({ children }) => {
  return (
    <ReactMarkdown
      className="markdown-container"
      remarkPlugins={[gfm, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
};

const Table: React.FC = (props) => (
  <table className="ui table">{props.children}</table>
);

const Heading: React.FC<HeadingProps> = (props) => {
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

const components: Components = {
  h1: Heading,
  h2: Heading,
  h3: Heading,
  h4: Heading,
  h5: Heading,
  h6: Heading,
  table: Table,
};
