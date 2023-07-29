import * as React from 'react';
import classNames from 'classnames';

import { Button, Divider } from 'semantic-ui-react';
import { EditorState, Editor, ContentState } from 'draft-js';

import { Styleable } from '../../../shared/types';
import { MarkdownView } from './MarkdownView';

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
      : EditorState.createEmpty(),
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
