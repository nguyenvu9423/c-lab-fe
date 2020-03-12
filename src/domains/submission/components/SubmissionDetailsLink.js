import * as React from 'react';
import { useDispatch } from 'react-redux';
import { requestModal } from '../../../store/actions/modal';
import { ModalMap } from '../../../components/modals';

export const SubmissionDetailsLink = props => {
  const { submissionId } = props;
  const dispatch = useDispatch();
  return (
    <a
      style={{ cursor: 'pointer' }}
      onClick={() => {
        dispatch(
          requestModal.request({
            modalType: ModalMap.SUBMISSION_DETAILS.type,
            submissionId
          })
        );
      }}
    >
      {submissionId}
    </a>
  );
};
