import * as React from 'react';
import { Confirm } from 'semantic-ui-react';
import { FormModal } from '../../../shared/types';
import { ProblemService } from '../../../services/ProblemService';

export const DeleteProblemConfirm: React.FC<
  FormModal.Props & { problemCode: string }
> = (props) => {
  return (
    <Confirm
      defaultOpen
      header="Delete problem"
      onCancel={props.onCancel}
      onConfirm={() => {
        ProblemService.deleteProblem(props.problemCode).then(() => {
          props.onSuccess?.();
        });
      }}
    />
  );
};
