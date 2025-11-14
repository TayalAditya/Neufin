"use client";

import { Component, ReactNode } from "react";
import { ErrorState } from "@/components/products/error-state";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
          <ErrorState
            title="Something went wrong"
            message={this.state.error?.message || "An unexpected error occurred"}
            onRetry={() => {
              this.setState({ hasError: false, error: undefined });
              window.location.reload();
            }}
          />
        </div>
      );
    }

    return this.props.children;
  }
}