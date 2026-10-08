export default function Summary({ stats }) {
  const entries = Object.entries(stats.byCategory);
  return (
    <div>
      <h2>Summary</h2>
      <p className="total">₹{stats.total.toLocaleString("en-IN")}</p>
      <p className="muted">{stats.count} expense(s) shown</p>
      {entries.length > 0 && (
        <ul className="breakdown">
          {entries.map(([cat, amt]) => (
            <li key={cat}>
              <span>{cat}</span>
              <span>₹{amt.toLocaleString("en-IN")}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
