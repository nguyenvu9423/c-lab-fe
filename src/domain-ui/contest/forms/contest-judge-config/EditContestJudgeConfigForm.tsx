import React from 'react';
import { useSelector } from 'react-redux';
import { FormikHelpers } from 'formik';

import { ContestJudgeConfig } from '@/domains/contest';
import { ProblemSelectors } from '@/store/selectors';
import { State } from '@/store/state';
import { ContestService } from '@/services/contest';
import { ValidationException } from '@/shared/exceptions';
import { ContestJudgeConfigForm } from './ContestJudgeConfigForm';

export namespace EditContestJudgeConfigForm {
  export interface Props {
    contestId: number;

    judgeConfig: ContestJudgeConfig;

    onSuccess?: () => void;
  }
}

export const EditContestJudgeConfigForm: React.FC<
  EditContestJudgeConfigForm.Props
> = (props) => {
  const {
    contestId,
    judgeConfig: { type, problemConfigs },
    onSuccess,
  } = props;

  const denormalizedProblemConfigs = useSelector((state: State) => {
    return problemConfigs.map<ContestJudgeConfigForm.ProblemConfig>(
      (config) => {
        return {
          code: config.code,
          score: config.score,
          problem: ProblemSelectors.byId(config.problem)(state),
        };
      },
    );
  });

  const denormalizedJudgeConfig: ContestJudgeConfigForm.Value = {
    type,
    problemConfigs: denormalizedProblemConfigs,
  };

  const handleSubmit = React.useCallback(
    (
      value: ContestJudgeConfigForm.Value,
      helpers: FormikHelpers<ContestJudgeConfigForm.Value>,
    ) => {
      return ContestService.updateJudgeConfig(contestId, {
        type: value.type,
        problemConfigs: value.problemConfigs.map(
          ({ code, problem, score }) => ({
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

  return (
    <ContestJudgeConfigForm
      initialValues={denormalizedJudgeConfig}
      onSubmit={handleSubmit}
    />
  );
};
