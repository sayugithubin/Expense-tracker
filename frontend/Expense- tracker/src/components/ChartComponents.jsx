import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartComponent({ data = [] }) {
  const labels = data.map((d) => d._id);
  const values = data.map((d) => d.total);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"],
      },
    ],
  };

  return (
    <div>
      {data.length ? <Pie data={chartData} /> : <p>No summary yet</p>}
    </div>
  );
}
