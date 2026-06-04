import CodeHighlight from './CodeHighlight';

export default function ConfigPanel({
  version,
  tab,
  paramsStr,
  bodyStr,
  headersStr,
  codeSnippet,
  onTabChange,
  onParamsChange,
  onBodyChange,
  onHeadersChange,
}) {
  const tabs = version === 'v1'
    ? ['body', 'headers', 'code']
    : ['params', 'body', 'headers', 'code'];

  const hasDot = t =>
    (t === 'params' && paramsStr) ||
    (t === 'body'   && bodyStr)   ||
    (t === 'headers' && headersStr);

  return (
    <div className="panel">
      <div className="tab-bar">
        {tabs.map(t => (
          <button
            key={t}
            className={`tab-btn ${tab === t ? 'tab-active' : ''}`}
            onClick={() => onTabChange(t)}
          >
            {t === 'code' ? 'Code Snippet' : t.charAt(0).toUpperCase() + t.slice(1)}
            {hasDot(t) && <span className="tab-dot" />}
          </button>
        ))}
      </div>

      <div className="panel-body">
        {tab === 'params' && (
          <textarea
            className="editor"
            value={paramsStr}
            placeholder={'{\n  "userId": 1,\n  "_limit": 10\n}'}
            spellCheck={false}
            onChange={e => onParamsChange(e.target.value)}
          />
        )}
        {tab === 'body' && (
          <textarea
            className="editor"
            value={bodyStr}
            placeholder={'{\n  "key": "value"\n}'}
            spellCheck={false}
            onChange={e => onBodyChange(e.target.value)}
          />
        )}
        {tab === 'headers' && (
          <textarea
            className="editor"
            value={headersStr}
            placeholder={'{\n  "Authorization": "Bearer <token>"\n}'}
            spellCheck={false}
            onChange={e => onHeadersChange(e.target.value)}
          />
        )}
        {tab === 'code' && (
          <pre className="code-view">
            <CodeHighlight code={codeSnippet} />
          </pre>
        )}
      </div>
    </div>
  );
}
