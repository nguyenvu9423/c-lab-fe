import React from 'react';
import { Modal } from 'semantic-ui-react';
import { FormikHelpers } from 'formik';

import { ProblemConfigForm } from '../forms/contest-judge-config/ProblemConfigForm';

export namespace AddProblemConfigModal {
  export interface Props {
    onCancel?: () => void;
    onSubmit?: (value: Value, helpers: FormikHelpers<Value>) => void;
  }

  export type Value = ProblemConfigForm.Value;
}

export const AddProblemConfigModal: React.FC<AddProblemConfigModal.Props> = (
  props,
) => {
  const { onCancel, onSubmit } = props;
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
        <ProblemConfigForm onSubmit={onSubmit} />
      </Modal.Content>
    </Modal>
  );
};
