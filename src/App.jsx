import { useState, useEffect, useRef } from 'react';
import useAxiosV1 from 'axios-react-hook-v1';
import useAxiosV2 from 'axios-react-hook-v2';

import { COLLECTIONS_V1, COLLECTIONS_V2 } from './utils/constants';
import { buildCodeSnippetV1, buildCodeSnippetV2, tryParseJSON } from './utils/helpers';

import Header        from './components/Header';
import Sidebar       from './components/Sidebar';
import RequestBar    from './components/RequestBar';
import ConfigPanel   from './components/ConfigPanel';
import ResponsePanel from './components/ResponsePanel';
import EmptyState    from './components/EmptyState';

import './styles.css';

const INITIAL     = COLLECTIONS_V2[0];
const SHARED_TABS = ['body', 'headers', 'code'];

export default function App() {
  const [theme,       setTheme]       = useState('black');
  const [version,     setVersion]     = useState('v2');
  const [activeId,    setActiveId]    = useState(INITIAL.id);
  const [method,      setMethod]      = useState(INITIAL.method);
  const [url,         setUrl]         = useState(INITIAL.url);
  const [paramsStr,   setParamsStr]   = useState('');
  const [bodyStr,     setBodyStr]     = useState('');
  const [headersStr,  setHeadersStr]  = useState('');
  const [configTab,   setConfigTab]   = useState('body');
  const [responseTab, setResponseTab] = useState('body');
  const [hasSent,     setHasSent]     = useState(false);
  const [respTime,    setRespTime]    = useState(null);
  const startRef = useRef(null);

  const parsedBody    = tryParseJSON(bodyStr);
  const parsedParams  = tryParseJSON(paramsStr);
  const parsedHeaders = tryParseJSON(headersStr);

  const v1 = useAxiosV1(url, method.toLowerCase(), parsedBody, false);
  const v2 = useAxiosV2({
    url,
    method:  method.toLowerCase(),
    params:  parsedParams,
    body:    parsedBody,
    headers: parsedHeaders,
    auto:    false,
  });

  const { data, loading, error } = version === 'v1' ? v1 : v2;

  const httpStatus = version === 'v2'
    ? v2.status
    : (error?.response?.status ?? null);

  useEffect(() => {
    if (!loading && startRef.current !== null) {
      setRespTime(Math.round(performance.now() - startRef.current));
      startRef.current = null;
    }
  }, [loading]);

  const handleSend = () => {
    if (!url.trim()) return;
    startRef.current = performance.now();
    setHasSent(true);
    setRespTime(null);
    setResponseTab('body');
    if (version === 'v1') v1.refetch();
    else v2.refetch();
  };

  const selectCollection = col => {
    setActiveId(col.id);
    setMethod(col.method);
    setUrl(col.url);
    setParamsStr(col.params || '');
    setBodyStr(col.body || '');
    setHeadersStr(col.headers || '');
    setHasSent(false);
    setRespTime(null);
  };

  const switchVersion = v => {
    startRef.current = null;
    setVersion(v);
    setRespTime(null);
    if (v === 'v1' && !SHARED_TABS.includes(configTab)) setConfigTab('body');
    const cols = v === 'v1' ? COLLECTIONS_V1 : COLLECTIONS_V2;
    selectCollection(cols.find(c => c.id === activeId) ?? cols[0]);
  };

  const collections = version === 'v1' ? COLLECTIONS_V1 : COLLECTIONS_V2;
  const codeSnippet = version === 'v1'
    ? buildCodeSnippetV1(method, url, bodyStr)
    : buildCodeSnippetV2(method, url, bodyStr, paramsStr, headersStr);

  return (
    <div className="app" data-theme={theme}>
      <Header
        version={version}
        theme={theme}
        onSwitch={switchVersion}
        onThemeToggle={() => setTheme(t => t === 'black' ? 'white' : 'black')}
      />
      <div className="workspace">
        <Sidebar
          collections={collections}
          activeId={activeId}
          onSelect={selectCollection}
        />
        <main className="main">
          <RequestBar
            method={method}
            url={url}
            loading={loading}
            onMethodChange={setMethod}
            onUrlChange={setUrl}
            onSend={handleSend}
          />
          <ConfigPanel
            version={version}
            tab={configTab}
            paramsStr={paramsStr}
            bodyStr={bodyStr}
            headersStr={headersStr}
            codeSnippet={codeSnippet}
            onTabChange={setConfigTab}
            onParamsChange={setParamsStr}
            onBodyChange={setBodyStr}
            onHeadersChange={setHeadersStr}
          />
          {hasSent ? (
            <ResponsePanel
              loading={loading}
              data={data}
              error={error}
              httpStatus={httpStatus}
              respTime={respTime}
              responseTab={responseTab}
              codeSnippet={codeSnippet}
              onTabChange={setResponseTab}
            />
          ) : (
            <EmptyState version={version} />
          )}
        </main>
      </div>
    </div>
  );
}
