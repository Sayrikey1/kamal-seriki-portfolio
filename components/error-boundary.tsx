"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: () => void;
}

interface State {
  failed: boolean;
}

/**
 * Guards the WebGL subtree. A driver crash or shader failure degrades to the
 * ambient backdrop instead of taking the page down.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("3D scene failed, falling back to backdrop:", error, info);
    }
    this.props.onError?.();
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
