import * as React from 'react';
import { Form, Button, Icon, Label } from 'semantic-ui-react';

function BaseFileUploadInput(props, forwardRef) {
  const { file, placeHolder = 'Chọn tệp...', onChange } = props;
  return (
    <Button
      as="div"
      labelPosition="right"
      style={{ display: 'flex' }}
      onClick={() => {
        forwardRef.current.click();
      }}
    >
      <Button type="button" icon>
        <Icon name="attach" />
        Tệp
      </Button>
      <Label basic pointing="left" style={{ flexGrow: '1' }}>
        {file ? file.name : placeHolder}
      </Label>
      <input ref={forwardRef} type="file" hidden onChange={onChange} />
    </Button>
  );
}

export const FileUploadInput = React.forwardRef(BaseFileUploadInput);
