import * as React from 'react';
import { Modal as UiModal, Dimmer, Loader, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../store/actions/modal';
import { LoadingState } from '../../store/common';
import { SubmissionDetailsSelectors } from '../../store/selectors/SubmissionDetailsSelectors';
import { CodeEditor } from '../editors';

const SubmissionDetailsModal = props => {
  const dispatch = useDispatch();
  const { submissionId, loadingState } = props;
  const submissionDetails = useSelector(
    SubmissionDetailsSelectors.byId(submissionId)
  );
  return (
    <UiModal
      open={true}
      closeIcon
      closeOnEscape
      closeOnDimmerClick
      onClose={() => {
        dispatch(hideModal());
      }}
      scrolling
    >
      <UiModal.Header> Submission #{submissionId}</UiModal.Header>
      <UiModal.Content>
        {loadingState === LoadingState.LOADING ? (
          <Dimmer inverted active>
            <Loader />
          </Dimmer>
        ) : (
          <>
            <Header as="h4">Code</Header>
            <CodeEditor
              style={{ maxHeight: 720 }}
              value={submissionDetails.codeText}
              readOnly
            />
          </>
        )}
      </UiModal.Content>
    </UiModal>
  );
};

export default SubmissionDetailsModal;
