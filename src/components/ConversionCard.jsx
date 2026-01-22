import "../styles/dashboard.css";

export default function ConversionCard() {
  const data = [
    { label: "Contact", w: "70%", c: "#6c63ff" },
    { label: "Qualified Lead", w: "55%", c: "#3bc9db" },
    { label: "Proposal Sent", w: "75%", c: "#f6c343" },
    { label: "Negotiation", w: "65%", c: "#6c63ff" },
    { label: "Closed Won", w: "60%", c: "#51cf66" },
    { label: "Closed Lost", w: "40%", c: "#fa5252" },
  ];

  return (
    <div className="card conversion-card ">
      <h6 className="conversion-title">
        Contact to Deal Conversion
      </h6>

      {data.map((d, i) => (
        <div key={i} className="conversion-row">
          <span>{d.label}</span>
          <div className="conversion-track">
            <div
              className="conversion-fill"
              style={{ width: d.w, backgroundColor: d.c }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
