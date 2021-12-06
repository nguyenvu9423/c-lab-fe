import React from 'react';
import { useNavigate } from 'react-router';
import { Button, Container, Message, Segment } from 'semantic-ui-react';
import { BaseException } from '../../exception';

export namespace ErrorFallbackPage {
  export interface Props {
    error: BaseException;
    onNavigate?(): void;
  }
}

export const ErrorFallbackPage: React.FC<ErrorFallbackPage.Props> = (props) => {
  const { error, onNavigate } = props;
  const navigate = useNavigate();
  return (
    <Container style={{ paddingTop: '7em' }}>
      <Message
        icon="warning circle"
        error
        header="Error"
        content={error.message}
        attached="top"
      />
      <Segment attached="bottom">
        <Button
          content="Home page"
          icon="home"
          onClick={() => {
            navigate('/');
            onNavigate?.();
          }}
        />
      </Segment>
    </Container>
  );
};
