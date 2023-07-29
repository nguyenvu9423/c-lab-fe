import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Submission } from '@/domains/submission';
import { setModal } from '@/store/actions/modal';
import { AuthorizationSelectors } from '@/store/selectors';

export namespace SubmissionDetailsLink {
  export interface Props {
    submission: Submission;
    children?: React.ReactNode;
  }
}

export const SubmissionDetailsLink: React.FC<SubmissionDetailsLink.Props> = (
  props,
) => {
  const { submission } = props;
  const canReadDetails = useSelector(
    AuthorizationSelectors.canReadSubDetails(submission),
  );
  const dispatch = useDispatch();

  return canReadDetails ? (
    <a
      style={{ cursor: 'pointer' }}
      onClick={() => {
        dispatch(
          setModal({
            type: 'DETAILED_SUB',
            props: { submissionId: submission.id },
          }),
        );
      }}
    >
      {submission.id}
    </a>
  ) : (
    <>{submission.id}</>
  );
};
