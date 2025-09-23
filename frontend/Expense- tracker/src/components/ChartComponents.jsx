import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartComponent({ data = [] }) {
  const normalized = data.map((d) => ({
    name: d._id ?? d.category ?? "Other",
    total: Number(d.total ?? d.amount ?? 0),
  }));
  const labels = normalized.map((d) => d.name);
  const values = normalized.map((d) => d.total);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
      },
    ],
  };

  const topThree = normalized
    .slice()
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  return (
    <div>
      {normalized.length ? <Pie data={chartData} /> : <p>No summary yet</p>}
      <div style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>Top 3 spending categories</div>
        {topThree.length > 0 && topThree.some(t => t.total > 0) ? (
          topThree.map((item, idx) => (
            <div key={item.name + idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#000000' }}>
              <span>{idx + 1}. {item.name}</span>
              <span>₹{item.total}</span>
            </div>
          ))
        ) : (
          <div style={{ color: '#94a3b8' }}>Add expenses to see your top categories.</div>
        )}
      </div>
    </div>
  );
}
