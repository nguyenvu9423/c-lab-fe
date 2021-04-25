import * as React from 'react';
import { Button, Label } from 'semantic-ui-react';

export const PutFileInput = props => {
  const { file, onChange } = props;
  const ref = React.useRef();
  const handleChange = React.useCallback(
    event => {
      const { files } = event.target;
      if (files.length === 1) {
        onChange?.(files[0]);
      }
    },
    [onChange]
  );

  const handleReset = React.useCallback(() => {
    ref.current.value = '';
    onChange?.(null);
  }, [onChange]);

  return (
    <div style={{ display: 'flex' }}>
      <Button as="div" labelPosition="left" style={{ flex: 1 }}>
        <Label as="a" basic style={{ minWidth: 160, flex: 1 }}>
          {file ? file.name : 'No file has uploaded'}
        </Label>
      </Button>
      {file ? (
        file.uploaded ? (
          <Button
            type="button"
            icon="download"
            as="a"
            href={file.downloadLink}
          />
        ) : (
          <Button type="button" icon="repeat" onClick={handleReset} />
        )
      ) : (
        undefined
      )}
      <Button
        type="button"
        icon="folder open"
        content="Change"
        onClick={() => {
          ref.current?.click();
        }}
      />
      <input ref={ref} type="file" hidden onChange={handleChange} />
    </div>
  );
};
