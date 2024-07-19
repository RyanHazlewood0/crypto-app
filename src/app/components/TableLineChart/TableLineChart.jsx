import PropTypes from "prop-types";
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

const TableLineChart = ({ coin }) => {
  const prices = coin.sparkline_in_7d.price;
  const minPrice = Math.min(prices);
  const maxPrice = Math.max(prices);
  const lineChartData = {
    labels: prices.map((index) => index),

    datasets: [
      {
        data: prices,
        borderColor: "#30e0a1",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
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

TableLineChart.propTypes = {
  coin: PropTypes.object,
};

export default TableLineChart;
