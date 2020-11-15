import * as React from 'react';
import DetailedSubmissionModal from '../../domains/submission/components/DetailedSubmissionModal';
import { useSelector } from 'react-redux';
import { ModalSelectors } from '../../store/selectors/ModalSelectors';

const ModalMap = {
  SUBMISSION_DETAILS: {
    type: 'SUBMISSION_DETAILS',
    component: DetailedSubmissionModal
  }
};

const Modal = () => {
  const { modalType, modalProps } = useSelector(ModalSelectors.state());
  if (!modalType) return null;
  const Component = ModalMap[modalType].component;
  return <Component {...modalProps} />;
};

export { Modal, ModalMap };
