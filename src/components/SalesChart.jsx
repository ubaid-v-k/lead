import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";


const MONTHLY_DATA = [
  { month: "Jan", front: 400, back: 700 },
  { month: "Feb", front: 200, back: 1100 },
  { month: "Mar", front: 300, back: 500 },
  { month: "Apr", front: 450, back: 800 },
  { month: "May", front: 200, back: 1100 },
  { month: "Jun", front: 220, back: 600 },
  { month: "Jul", front: 300, back: 600 },
  { month: "Aug", front: 420, back: 1100 },
  { month: "Sep", front: 800, back: 900 },
  { month: "Oct", front: 420, back: 550 },
  { month: "Nov", front: 550, back: 750 },
  { month: "Dec", front: 400, back: 750 },
];

const WEEKLY_DATA = [
  { month: "Mon", front: 100, back: 300 },
  { month: "Tue", front: 200, back: 400 },
  { month: "Wed", front: 150, back: 350 },
  { month: "Thu", front: 300, back: 500 },
  { month: "Fri", front: 250, back: 450 },
  { month: "Sat", front: 400, back: 600 },
  { month: "Sun", front: 350, back: 550 },
];

const YEARLY_DATA = [
  { month: "2021", front: 2000, back: 5000 },
  { month: "2022", front: 3000, back: 7000 },
  { month: "2023", front: 4500, back: 9000 },
  { month: "2024", front: 6000, back: 11000 },
];

export default function SalesChart({ view = "Monthly" }) {
  const chartData = view === "Weekly" ? WEEKLY_DATA : view === "Yearly" ? YEARLY_DATA : MONTHLY_DATA;

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={chartData}
        barGap={-40}
        barCategoryGap={32}
        margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
      >
        {/* ===== DEFINITIONS ===== */}
        <defs>
          {/* Front bar gradient */}
          <linearGradient id="frontGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="38%" stopColor="#8061DB61" />
            <stop offset="94%" stopColor="#8061DBF0" />
          </linearGradient>

          {/* Back bar vertical stripes */}
          <pattern
            id="stripePattern"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <rect width="6" height="6" fill="#FEFDFF" fillOpacity="0.5" />
            <rect
              x="0"
              y="0"
              width="2"
              height="6"
              fill="#E6E5FB"
              fillOpacity="0.5"
            />
          </pattern>
        </defs>

        {/* ===== AXES ===== */}
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 13, fill: "#475569" }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          ticks={[0, 200, 500, 1000]}
          domain={[0, 1200]}
          tickFormatter={(v) => `$${v}`}
          tick={{ fontSize: 12, fill: "#64748b" }}
          width={50}
        />

        {/* ===== BACK BAR ===== */}
        <Bar
          dataKey="back"
          fill="url(#stripePattern)"
          barSize={40}
          radius={[4, 4, 1, 1]}
        />

        {/* ===== FRONT BAR ===== */}
        <Bar
          dataKey="front"
          fill="url(#frontGradient)"
          barSize={40}
          radius={[4, 4, 1, 1]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}