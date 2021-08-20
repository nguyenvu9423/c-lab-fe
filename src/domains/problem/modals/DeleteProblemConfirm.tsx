import * as React from 'react';
import { Confirm } from 'semantic-ui-react';
import { FormModal } from '../../../common/types';
import { ProblemService } from '../../../service/ProblemService';

export const DeleteProblemConfirm: React.FC<
  FormModal.Props & { problemId: number }
> = (props) => {
  return (
    <Confirm
      defaultOpen
      header="Delete problem"
      onCancel={props.onCancel}
      onConfirm={() => {
        ProblemService.deleteProblem(props.problemId).then(() => {
          props.onSuccess?.();
        });
      }}
    />
  );
};
