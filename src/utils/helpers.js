export function tryParseJSON(str) {
  if (!str || !str.trim()) return null;
  try { return JSON.parse(str); } catch { return null; }
}

export function formatSize(data) {
  if (data == null) return '';
  const bytes = new Blob([JSON.stringify(data)]).size;
  return bytes < 1024
    ? `${bytes} B`
    : `${(bytes / 1024).toFixed(1)} KB`;
}

export function syntaxHighlight(data) {
  if (data == null) return '';
  return JSON.stringify(data, null, 2)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(?:\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      token => {
        if (/^"/.test(token))         return `<span class="${/:$/.test(token) ? 'hl-key' : 'hl-str'}">${token}</span>`;
        if (/true|false/.test(token)) return `<span class="hl-bool">${token}</span>`;
        if (/null/.test(token))       return `<span class="hl-null">${token}</span>`;
        return `<span class="hl-num">${token}</span>`;
      },
    );
}

export function buildCodeSnippetV1(method, url, bodyStr) {
  const m       = method.toLowerCase();
  const body    = tryParseJSON(bodyStr);
  const bodyArg = body
    ? JSON.stringify(body, null, 2).replace(/\n/g, '\n    ')
    : 'null';

  return [
    `// npm install axios-react-hook@1.0.0`,
    `import useAxios from 'axios-react-hook';`,
    ``,
    `function MyComponent() {`,
    `  const { data, loading, error, refetch } = useAxios(`,
    `    '${url}',`,
    `    '${m}',`,
    `    ${bodyArg},`,
    `    false,`,
    `  );`,
    ``,
    `  if (loading) return <p>Loading…</p>;`,
    `  if (error)   return <p>Error: {error.message}</p>;`,
    `  return <pre>{JSON.stringify(data, null, 2)}</pre>;`,
    `}`,
  ].join('\n');
}

export function buildCodeSnippetV2(method, url, bodyStr, paramsStr, headersStr) {
  const m       = method.toLowerCase();
  const body    = tryParseJSON(bodyStr);
  const params  = tryParseJSON(paramsStr);
  const headers = tryParseJSON(headersStr);

  const lines = [
    `// npm install axios-react-hook`,
    `import useAxios from 'axios-react-hook';`,
    ``,
    `function MyComponent() {`,
    `  const { data, loading, error, status, refetch, cancel } = useAxios({`,
    `    url: '${url}',`,
  ];

  if (m !== 'get') lines.push(`    method: '${m}',`);
  if (params)      lines.push(`    params: ${JSON.stringify(params)},`);
  if (body)        lines.push(`    body: ${JSON.stringify(body)},`);
  if (headers)     lines.push(`    headers: ${JSON.stringify(headers)},`);

  lines.push(
    `    auto: false,`,
    `  });`,
    ``,
    `  if (loading) return <p>Loading…</p>;`,
    `  if (error)   return <p>Error: {error.message}</p>;`,
    `  return <pre>{JSON.stringify(data, null, 2)}</pre>;`,
    `}`,
  );

  return lines.join('\n');
}
