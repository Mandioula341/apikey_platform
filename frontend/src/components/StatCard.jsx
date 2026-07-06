export default function StatCard({ label, value, unit, accent }) {
  return (
    <div className="card stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={accent ? { color: accent } : undefined}>
        {value}
        {unit && <span className="stat-unit"> {unit}</span>}
      </div>
    </div>
  );
}
