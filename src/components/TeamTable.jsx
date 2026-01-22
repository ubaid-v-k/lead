import "../styles/teamTable.css";

export default function TeamTable() {
  const rows = [
    { name: "Ethan Harper", active: 25, closed: 10, revenue: "$12,000", up: true },
    { name: "Olivia Bennett", active: 30, closed: 15, revenue: "$15,000", up: false },
    { name: "Liam Carter", active: 22, closed: 12, revenue: "$10,000", up: true },
    { name: "Sophia Evans", active: 28, closed: 14, revenue: "$14,000", up: false },
  ];

  return (
    <div className="team-card">
      <div className="team-card-header">
        <h6>Team Performance Tracking</h6>
        <button className="export-btn">Export CSV</button>
      </div>

      <div className="table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Active Deals</th>
              <th>Closed Deals</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.active}</td>
                <td>{r.closed}</td>
                <td>
                  {r.revenue}{" "}
                  <span className={`badge ${r.up ? "up" : "down"}`}>
                    {r.up ? "+3.4%" : "-0.1%"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
