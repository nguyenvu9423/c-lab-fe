import React from 'react';
import { Confirm } from 'semantic-ui-react';
import { ContestService } from '@/services/contest';
import { BaseException } from '@/shared/exceptions';
import { FormModal } from '@/shared/types';

export namespace DeleteContestConfirm {
  export interface Props extends FormModal.Props {
    contestId: number;
    onError?: (error: BaseException) => void;
  }
}

export const DeleteContestConfirm: React.FC<DeleteContestConfirm.Props> = ({
  contestId,
  onCancel,
  onSuccess,
  onError,
}) => {
  return (
    <Confirm
      defaultOpen
      header="Xóa kỳ thi"
      content="Bạn có chắc chắn muốn xóa kỳ thi này?"
      onCancel={onCancel}
      onConfirm={() => {
        ContestService.deleteContest(contestId)
          .then(() => onSuccess?.())
          .catch((error) => onError?.(error));
      }}
    />
  );
};
