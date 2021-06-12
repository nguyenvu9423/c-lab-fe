import * as React from 'react';
import { Button, Divider } from 'semantic-ui-react';
import { EditorState, Editor, ContentState } from 'draft-js';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export function MarkdownEditor(props) {
  const { initialValue } = props;
  const editorRef = React.useRef();

  const [editorState, setEditorState] = React.useState(
    initialValue
      ? EditorState.createWithContent(ContentState.createFromText(initialValue))
      : EditorState.createEmpty()
  );

  const [selectedTab, setSelectedTab] = React.useState('write');

  return (
    <div className="markdown-editor">
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
}

// const handleEditorBlur = React.useCallback((event, editor) => {
//   setFieldValue('definition', editor.getData());
// }, []);

export function MarkdownView({ children }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
      {children}
    </ReactMarkdown>
  );
}
