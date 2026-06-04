import CodeHighlight from './CodeHighlight';
import { syntaxHighlight, formatSize } from '../utils/helpers';
import { statusLabel, statusClass } from '../utils/constants';

export default function ResponsePanel({
  loading,
  data,
  error,
  httpStatus,
  respTime,
  responseTab,
  codeSnippet,
  onTabChange,
}) {
  return (
    <div className="panel response-panel">
      <div className="response-bar">
        <div className="response-meta">
          {loading ? (
            <span className="meta-loading">● Waiting…</span>
          ) : (
            <>
              {httpStatus && (
                <span className={`http-status ${statusClass(httpStatus)}`}>
                  {statusLabel(httpStatus)}
                </span>
              )}
              {error && !httpStatus && (
                <span className="http-status status-error">Network Error</span>
              )}
              {respTime !== null && (
                <span className="meta-pill">{respTime} ms</span>
              )}
              {data != null && (
                <span className="meta-pill">{formatSize(data)}</span>
              )}
            </>
          )}
        </div>

        <div className="tab-bar tab-bar-flush">
          {['body', 'snippet'].map(t => (
            <button
              key={t}
              className={`tab-btn ${responseTab === t ? 'tab-active' : ''}`}
              onClick={() => onTabChange(t)}
            >
              {t === 'snippet' ? 'Code Snippet' : 'Body'}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-body">
        {loading && (
          <div className="loading-placeholder">
            <div className="loading-bars">
              {[70, 90, 55, 80, 40].map((w, i) => (
                <div
                  key={i}
                  className="loading-bar"
                  style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && responseTab === 'body' && (
          error ? (
            <div className="error-block">
              <div className="error-title">Request Failed</div>
              <div className="error-msg">{error.message}</div>
              {error.response?.data && (
                <pre
                  className="json-view"
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(error.response.data) }}
                />
              )}
            </div>
          ) : data != null ? (
            <pre
              className="json-view"
              dangerouslySetInnerHTML={{ __html: syntaxHighlight(data) }}
            />
          ) : (
            <div className="empty-response">Empty response</div>
          )
        )}

        {!loading && responseTab === 'snippet' && (
          <pre className="code-view">
            <CodeHighlight code={codeSnippet} />
          </pre>
        )}
      </div>
    </div>
  );
}
