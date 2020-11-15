import * as React from 'react';
import { Button } from 'semantic-ui-react';

export function SubmitButton(props) {
  return (
    <Button type="submit" icon="check" content="Submit" primary {...props} />
  );
}

export function CancelButton(props) {
  return <Button type="button" icon="cancel" content="Cancel" {...props} />;
}
