const TOKEN_RE = /(\/\/[^\n]*|'[^']*'|"[^"]*"|`[^`]*`|\b(?:import|export|default|from|function|return|const|let|var|if|null|false|true)\b|[{}()[\],.:;=<>/])/g;

const KEYWORDS  = /^(import|export|default|from|function|return|const|let|var|if)$/;
const LITERALS  = /^(null|false|true)$/;

function tokenType(t) {
  if (t.startsWith('//'))  return 'comment';
  if (/^['"`]/.test(t))   return 'string';
  if (KEYWORDS.test(t))   return 'keyword';
  if (LITERALS.test(t))   return 'literal';
  return 'plain';
}

export default function CodeHighlight({ code }) {
  const tokens = [];
  let last = 0;
  let m;

  TOKEN_RE.lastIndex = 0;

  while ((m = TOKEN_RE.exec(code)) !== null) {
    if (m.index > last) {
      tokens.push({ type: 'plain', text: code.slice(last, m.index) });
    }
    tokens.push({ type: tokenType(m[0]), text: m[0] });
    last = m.index + m[0].length;
  }

  if (last < code.length) {
    tokens.push({ type: 'plain', text: code.slice(last) });
  }

  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} className={`tok-${tok.type}`}>{tok.text}</span>
      ))}
    </>
  );
}
