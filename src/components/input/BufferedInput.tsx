import * as React from 'react';
import { Input, InputProps } from 'semantic-ui-react';
import { Key } from '../../utility';

export namespace BufferedInput {
  export interface Props extends Omit<InputProps, 'onChange'> {
    onChange?: (value: string) => void;
  }
}

export const BufferedInput: React.FC<BufferedInput.Props> = (props) => {
  const { onChange, ...restProps } = props;
  const [internalValue, setInternalValue] = React.useState(
    props.initialValue ?? ''
  );
  const [submittedValue, setSubmittedValue] = React.useState('');

  const submitChange = React.useCallback(
    (force?: boolean) => {
      if (force || submittedValue !== internalValue) {
        setSubmittedValue(internalValue);
        onChange?.(internalValue);
      }
    },
    [submittedValue, internalValue, onChange]
  );

  return (
    <Input
      value={internalValue}
      onChange={(event, data) => {
        setInternalValue(data.value);
      }}
      onKeyDown={(event) => {
        if (event.key === Key.Enter) {
          submitChange(true);
        }
      }}
      onBlur={() => submitChange()}
      {...restProps}
    />
  );
};
