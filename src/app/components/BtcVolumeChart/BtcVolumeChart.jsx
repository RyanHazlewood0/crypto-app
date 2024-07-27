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
    labels: btcVolumeData.map((obj) => obj.date),
    datasets: [
      {
        label: null,
        data: btcVolumeData.map((obj) => obj.volume),
        backgroundColor: "#240046",
        borderColor: "#a663cc",
        borderWidth: 1,
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
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      x: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "49%",
        background: "#191932",
        borderRadius: "6px",
        maxHeight: "400px",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <Bar options={options} data={barChartData} style={{ maxHeight: "70%" }} />
    </div>
  );
};

BtcVolumeChart.propTypes = {
  btcVolumeData: PropTypes.arrayOf(PropTypes.number),
};

export default BtcVolumeChart;
