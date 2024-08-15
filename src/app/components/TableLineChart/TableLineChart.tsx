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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TableLineChartProps = {
  coin: {
    sparkline_in_7d: {
      price: number[];
    };
  };
};

const TableLineChart = ({ coin }: TableLineChartProps) => {
  const prices = coin.sparkline_in_7d.price;
  const minPrice = Math.min(prices);
  const maxPrice = Math.max(prices);
  const lineChartData = {
    labels: prices.map(() => "price"),

    datasets: [
      {
        data: prices,
        borderColor: "#30e0a1",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: minPrice,
        max: maxPrice,
      },
    },
  };

  return <Line options={options} data={lineChartData} />;
};

export default TableLineChart;
