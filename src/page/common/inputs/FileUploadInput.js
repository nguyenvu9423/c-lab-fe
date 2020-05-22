import * as React from 'react';
import { Form, Button, Icon, Label } from 'semantic-ui-react';

export function FileUploadInput(props) {
  const { file, placeHolder = 'Chọn tệp...', onChange, name } = props;
  const inputRef = React.useRef();
  return (
    <Button
      as="div"
      labelPosition="right"
      style={{ display: 'flex' }}
      onClick={() => {
        inputRef.current.click();
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
        onChange={onChange}
      />
    </Button>
  );
}
