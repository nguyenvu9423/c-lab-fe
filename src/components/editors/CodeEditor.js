import * as React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-clouds';

export const CodeEditor = (props) => {
  return (
    <AceEditor
      style={{ maxHeight: 720 }}
      mode="c_cpp"
      theme="clouds"
      {...props}
    />
  );
};
