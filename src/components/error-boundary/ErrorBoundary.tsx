import React from 'react';
import { BaseException } from '../../shared/exceptions';
import { ErrorFallbackPage } from './ErrorFallbackPage';

export class ErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  { error?: BaseException }
> {
  private shown: boolean;

  constructor(props) {
    super(props);
    this.shown = false;
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error) {
    return { error: error as BaseException };
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return (
        <ErrorFallbackPage
          error={this.state.error}
          onNavigate={() => this.setState({ error: undefined })}
        />
      );
    }

    return this.props.children;
  }
}
