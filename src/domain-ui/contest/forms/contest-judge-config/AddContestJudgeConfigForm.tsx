import React from 'react';
import { Button } from 'semantic-ui-react';
import { FormikHelpers } from 'formik';

import { useFormKey } from '@/components/form';
import { ContestService } from '@/services/contest';
import { ValidationException } from '@/shared/exceptions';
import { ContestJudgeConfigForm } from './ContestJudgeConfigForm';

export namespace AddContestJudgeConfigForm {
  export interface Props {
    contestId: number;

    onSuccess?: () => void;
  }
}

export const AddJudgeConfigForm: React.FC<AddContestJudgeConfigForm.Props> = (
  props,
) => {
  const { contestId, onSuccess } = props;
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [key] = useFormKey();

  const handleSubmit = React.useCallback(
    (
      value: ContestJudgeConfigForm.Value,
      helpers: FormikHelpers<ContestJudgeConfigForm.Value>,
    ) => {
      return ContestService.updateJudgeConfig(contestId, {
        type: value.type,
        problemConfigs: value.problemConfigs.map(
          ({ code, score, problem }) => ({
            code,
            score,
            problemId: problem.id,
          }),
        ),
      })
        .then(() => {
          onSuccess?.();
        })
        .catch((err) => {
          if (ValidationException.isInstance(err)) {
            helpers.setErrors(ValidationException.convertToFormikErrors(err));
          }
        });
    },
    [onSuccess, contestId],
  );

  if (isConfirmed) {
    return <ContestJudgeConfigForm key={key} onSubmit={handleSubmit} />;
  } else {
    return (
      <Button
        icon="add"
        content="Thêm cài đặt"
        labelPosition="left"
        onClick={() => setIsConfirmed(true)}
      />
    );
  }
};
