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

const BtcPriceChart = ({ btcPriceData }) => {
  const lineChartData = {
    labels: btcPriceData.map(() => "1"),
    datasets: [
      {
        label: "price",
        data: btcPriceData,
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
        display: true,
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
  };
  return <>{btcPriceData && <Line options={options} data={lineChartData} />}</>;
};

BtcPriceChart.propTypes = {
  btcPriceData: PropTypes.arrayOf(PropTypes.number),
};

export default BtcPriceChart;
