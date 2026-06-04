export default function Header({ version, theme, onSwitch, onThemeToggle }) {
  const themeTitle = theme === 'black' ? 'Switch to white theme' : 'Switch to black theme';

  return (
    <header className="header">
      <div className="header-left">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#ff6c37" strokeWidth="2" />
          <path d="M8 12h8M12 8v8" stroke="#ff6c37" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="logo-name">axios-react-hook</span>
        <span className="logo-sep">/</span>
        <span className="logo-sub">playground</span>
      </div>

      <div className="header-right">
        <button className="theme-btn" onClick={onThemeToggle} title={themeTitle}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z" stroke="currentColor" strokeWidth="2" />
            <path d="M12 2a10 10 0 0 1 0 20V2Z" fill="currentColor" />
          </svg>
        </button>

        <div className="version-toggle">
          <button
            className={`vtoggle-btn ${version === 'v1' ? 'vtoggle-active' : ''}`}
            onClick={() => onSwitch('v1')}
          >
            v1
          </button>
          <button
            className={`vtoggle-btn ${version === 'v2' ? 'vtoggle-active' : ''}`}
            onClick={() => onSwitch('v2')}
          >
            v2
          </button>
        </div>
      </div>
    </header>
  );
}
