import * as React from 'react';
import { Input } from 'semantic-ui-react';
import { Key } from '../../utility';

export function BufferedInput(props) {
  const { onChange, ...restProps } = props;
  const [internalValue, setInternalValue] = React.useState(
    props.initialValue ?? ''
  );
  const [submittedValue, setSubmittedValue] = React.useState(false);

  const submitChange = React.useCallback(() => {
    if (submittedValue !== internalValue) {
      setSubmittedValue(internalValue);
      onChange?.(internalValue);
    }
  }, [submittedValue, internalValue, onChange]);

  return (
    <Input
      value={internalValue}
      onChange={(event, data) => {
        setInternalValue(data.value);
      }}
      onKeyDown={(event) => {
        if (event.key === Key.Enter) {
          submitChange();
        }
      }}
      onBlur={submitChange}
      {...restProps}
    />
  );
}
