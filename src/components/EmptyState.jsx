export default function EmptyState({ version }) {
  const installHint = version === 'v1'
    ? '# v1\nnpm install axios-react-hook@1.0.0'
    : '# v2\nnpm install axios-react-hook';

  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <p className="empty-title">No response yet</p>
      <p className="empty-sub">
        Select a collection or enter a URL, then click <kbd>Send</kbd>
      </p>
      <pre className="empty-hint">{installHint}</pre>
    </div>
  );
}
