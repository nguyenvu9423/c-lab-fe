import * as React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const RichTextEditor = () => {
  return (
    <div className="editor-wrapper">
      <Editor
        editorClassName="content"
        toolbar={{
          options: [
            'blockType',
            'inline',
            'list',
            'textAlign',
            'link',
            'embedded',
            'emoji',
            'image',
            'history'
          ],
          inline: {
            options: [
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'monospace'
            ]
          }
        }}
      />
    </div>
  );
};
