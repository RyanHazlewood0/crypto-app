import PropTypes from "prop-types";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BtcVolumeChart = ({ btcVolumeData }) => {
  const barChartData = {
    labels: btcVolumeData.map(() => "1"),
    datasets: [
      {
        label: "Volume",
        data: btcVolumeData,
        backgroundColor: "yellow",
        borderColor: "black",
        borderWidth: 1,
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
  };

  return <Bar options={options} data={barChartData} />;
};

BtcVolumeChart.propTypes = {
  btcVolumeData: PropTypes.arrayOf(PropTypes.number),
};

export default BtcVolumeChart;
