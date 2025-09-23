import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./ChartComponent.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartComponent({ data = [] }) {
  const labels = data.map((d) => d._id);
  const values = data.map((d) => d.total);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#4a5fc1",
          "#ff6384",
          "#36a2eb",
          "#ffcd56",
          "#4bc0c0",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card chart-section">
      <h3>📊 Expense Overview</h3>
      {data.length ? <Pie data={chartData} /> : <p>No data yet</p>}
    </div>
  );
}
