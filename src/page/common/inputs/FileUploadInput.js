import * as React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';

export function FileUploadInput(props) {
  const { file, placeHolder = 'Chọn tệp...', onChange, name, style } = props;

  const inputRef = React.useRef();
  return (
    <Button
      as="div"
      labelPosition="right"
      style={{ display: 'flex', ...style }}
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <Button type="button" icon>
        <Icon name="attach" />
        Tệp
      </Button>
      <Label basic pointing="left" style={{ flexGrow: '1' }}>
        {file ? file.name : placeHolder}
      </Label>
      <input
        ref={inputRef}
        type="file"
        name={name}
        hidden
        onChange={event => {
          const { files } = event.target;
          if (files.length === 1) {
            onChange?.(files[0]);
          }
        }}
      />
    </Button>
  );
}
