import * as React from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../../store/actions/modal';

export namespace SubmissionDetailsLink {
  export interface Props {
    submissionId: number;
  }
}

export const SubmissionDetailsLink: React.FC<SubmissionDetailsLink.Props> = (
  props
) => {
  const { submissionId } = props;
  const dispatch = useDispatch();
  return (
    <a
      style={{ cursor: 'pointer' }}
      onClick={() => {
        dispatch(
          setModal({
            type: 'DETAILED_SUB',
            props: { submissionId },
          })
        );
      }}
    >
      {submissionId}
    </a>
  );
};
