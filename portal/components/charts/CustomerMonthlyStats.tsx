"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CustomerMonthlyStats() {
  const data: any = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [
          40000, 65000, 55000, 60000, 50000, 58000, 42000, 54000, 65000, 63000,
          60000, 45000,
        ],
        borderColor: "#129549",
        borderWidth: 2,
        backgroundColor: "#129549",
        tension: 0.3,
      },
      {
        label: "Dataset 2",
        data: [
          42000, 53000, 60000, 55000, 58000, 45000, 62000, 50000, 56000, 61000,
          57000, 40000,
        ],
        borderColor: "#FF6666",
        borderWidth: 2,
        backgroundColor: "#FF6666",
        tension: 0.3,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: (value: number) => `${value / 1000}k`,
        },
      },
    },
  };

  return (
    <div className="content-container flex flex-col monthly-stats">
      <h3 className="opacity-70">Monthly Stats</h3>
      <div className="legend flex gap-4">
        <span className="cash-in flex gap-1 items-center mb-1">
          <span></span>
          Cash in
        </span>
        <span className="cash-out flex gap-1 items-center mb-1">
          <span></span>
          Cash out
        </span>
      </div>
      <div style={{ width: "100%", height: "95%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default CustomerMonthlyStats;
