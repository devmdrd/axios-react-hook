export default function Sidebar({ collections, activeId, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-heading">Collections</div>
      <div className="collection-group">
        <div className="group-label">
          <span className="group-dot" />
          JSONPlaceholder
        </div>
        {collections.map(col => (
          <button
            key={col.id}
            className={`col-row ${activeId === col.id ? 'col-active' : ''}`}
            onClick={() => onSelect(col)}
          >
            <span className={`method-pill pill-${col.method.toLowerCase()}`}>
              {col.method}
            </span>
            <span className="col-label">{col.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
