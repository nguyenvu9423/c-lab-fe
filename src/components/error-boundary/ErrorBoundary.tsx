import React from 'react';
import { BaseException } from '../../exception';
import { ErrorFallbackPage } from './ErrorFallbackPage';

export class ErrorBoundary extends React.Component<
  Record<string, unknown>,
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

  render() {
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
