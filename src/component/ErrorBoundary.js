import React from "react";

/**
 * Error Boundary – catches uncaught JS errors in the component tree
 * and shows a friendly fallback UI.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.wrapper}>
          <div style={styles.card}>
            <div style={styles.icon}>⚠️</div>
            <h2 style={styles.title}>Something went wrong</h2>
            <p style={styles.message}>
              An unexpected error occurred. Please try again.
            </p>
            <button style={styles.btn} onClick={this.handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    padding: "40px 20px",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    textAlign: "center",
    maxWidth: 420,
    padding: "48px 32px",
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  icon: { fontSize: "3rem", marginBottom: 16 },
  title: {
    fontSize: "1.4rem",
    fontWeight: 800,
    color: "#222",
    margin: "0 0 8px",
  },
  message: {
    fontSize: "0.9rem",
    color: "#777",
    lineHeight: 1.6,
    margin: "0 0 24px",
  },
  btn: {
    padding: "10px 28px",
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: "0.88rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
};

export default ErrorBoundary;
