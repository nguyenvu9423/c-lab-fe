import React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormikHelpers } from 'formik';

import { ProblemConfigForm } from '../forms/contest-judge-config/ProblemConfigForm';

export namespace EditProblemConfigModal {
  export interface Props {
    initialValue?: ProblemConfigForm.Value;
    onCancel?: () => void;
    onSubmit?: (value: Value, helpers: FormikHelpers<Value>) => void;
  }

  export type Value = ProblemConfigForm.Value;
}

export const EditProblemConfigModal: React.FC<EditProblemConfigModal.Props> = (
  props,
) => {
  const { initialValue, onCancel, onSubmit } = props;
  return (
    <Modal
      defaultOpen
      size="small"
      closeOnDimmerClick
      closeOnEscape
      closeIcon
      onClose={onCancel}
    >
      <Modal.Header>Thêm bài tập</Modal.Header>
      <Modal.Content>
        <ProblemConfigForm initialValue={initialValue} onSubmit={onSubmit} />
      </Modal.Content>
    </Modal>
  );
};
