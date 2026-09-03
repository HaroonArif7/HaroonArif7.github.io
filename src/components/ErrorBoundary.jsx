import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio ErrorBoundary caught an exception:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              padding: '3rem 1.5rem',
              color: '#f87171',
              textAlign: 'center',
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '12px',
              margin: '2rem auto',
              maxWidth: '600px'
            }}
          >
            <AlertTriangle size={36} style={{ margin: '0 auto 1rem', color: '#ef4444' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
              Something went wrong loading this section
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              {this.state.error?.toString()}
            </p>
            <button
              onClick={this.handleReset}
              className="btn btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem',
                padding: '0.5rem 1rem'
              }}
            >
              <RefreshCw size={16} /> Try Reloading Component
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
