import * as React from 'react';
import SubmissionDetailsModal from './SubmissionDetailsModal';
import { useSelector } from 'react-redux';
import { ModalSelectors } from '../../store/selectors/ModalSelectors';

const ModalMap = {
  SUBMISSION_DETAILS: {
    type: 'SUBMISSION_DETAILS',
    component: SubmissionDetailsModal
  }
};

const Modal = () => {
  const { modalType, modalProps, loadingState, error } = useSelector(
    ModalSelectors.state()
  );
  if (!modalType) return null;
  const Component = ModalMap[modalType].component;
  return (
    <Component {...modalProps} loadingState={loadingState} error={error} />
  );
};

export { Modal, ModalMap };
