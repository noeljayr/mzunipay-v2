"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MerchantRevenueChart() {
  const data = {
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
        label: "Monthly Data",
        data: [
          40000, 65000, 55000, 60000, 50000, 58000, 42000, 54000, 65000, 63000,
          60000, 45000,
        ],
        backgroundColor: "rgba(142, 225, 173, 0.5)",
        borderColor: "#129549",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
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
          callback: (value: any) => `${value / 1000}k`,
        },
      },
    },
  };

  return (
    <div className="content-container flex flex-col monthly-stats">
      <h3 className="opacity-70">Revenue</h3>
      <div style={{ width: "100%", height: "95%" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default MerchantRevenueChart;
