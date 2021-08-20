import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import classNames from 'classnames';

export const RichTextEditor: React.FC<{
  className: string;
  initialValue?: string;
  onChange?: (text) => void;
}> = (props) => {
  const [editorState, setEditorState] = React.useState<EditorState>(
    props.initialValue
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(props.initialValue))
        )
      : EditorState.createEmpty()
  );

  return (
    <div className={classNames(props.className, 'editor-wrapper')}>
      <Editor
        defaultEditorState={editorState}
        onEditorStateChange={setEditorState}
        editorClassName="content"
        toolbar={toolbar}
        onBlur={() => {
          props.onChange?.(
            draftToHtml(
              convertToRaw(editorState.getCurrentContent()),
              {},
              false,
              ({ type, data }) => {
                //entity.data.alignment is for float using the LCR options on the image 'none' means the user clicked center
                if (type === 'IMAGE') {
                  const alignment = data.alignment || 'none';
                  const textAlign = alignment === 'none' ? 'center' : alignment;

                  return `
                      <p style="text-align:${textAlign};">
                          <img src="${data.src}" alt="${data.alt}" style="height: ${data.height};width: ${data.width}"/>
                      </p>
                  `;
                }
              }
            )
          );
        }}
      />
    </div>
  );
};

const toolbar = {
  options: [
    'blockType',
    'inline',
    'list',
    'textAlign',
    'link',
    'embedded',
    'emoji',
    'image',
    'history',
  ],
  blockType: {
    options: ['Normal', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
  },
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
  },
};
