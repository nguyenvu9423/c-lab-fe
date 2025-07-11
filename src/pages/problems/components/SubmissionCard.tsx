import * as React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { AuthorizationSelectors } from '@/store/selectors';
import { LoginButton } from '../../common';
import { SubmissionForm, CompactSubmissionForm } from '@/domain-ui/submission';

export const SubmissionCard: React.FC<SubmissionForm.Props> = (props) => {
  const canSubmit = useSelector(AuthorizationSelectors.canSubmit());

  return (
    <>
      <Header as="h3" attached="top">
        Nộp bài
      </Header>
      <Segment attached className="clear-fix-container">
        {canSubmit ? (
          <CompactSubmissionForm {...props} />
        ) : (
          <>
            <p>Cần đăng nhập để nộp bài</p>
            <LoginButton floated="right" />
          </>
        )}
      </Segment>
    </>
  );
};
