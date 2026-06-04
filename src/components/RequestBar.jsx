import { METHODS } from '../utils/constants';

export default function RequestBar({ method, url, loading, onMethodChange, onUrlChange, onSend }) {
  return (
    <div className="request-bar">
      <select
        className={`method-select sel-${method.toLowerCase()}`}
        value={method}
        onChange={e => onMethodChange(e.target.value)}
      >
        {METHODS.map(m => (
          <option key={m}>{m}</option>
        ))}
      </select>

      <input
        className="url-input"
        value={url}
        placeholder="https://api.example.com/endpoint"
        spellCheck={false}
        onChange={e => onUrlChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSend()}
      />

      <button
        className={`send-btn ${loading ? 'send-busy' : ''}`}
        disabled={loading}
        onClick={onSend}
      >
        {loading ? (
          <>
            <span className="spin" />
            Sending
          </>
        ) : (
          'Send'
        )}
      </button>
    </div>
  );
}
