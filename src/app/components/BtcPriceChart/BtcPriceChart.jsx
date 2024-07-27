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
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BtcPriceChart = ({ btcPriceData }) => {
  const lineChartData = {
    labels: btcPriceData.map((obj) => obj.date),
    datasets: [
      {
        label: null,
        data: btcPriceData.map((obj) => obj.price.toFixed()),
        borderColor: "#2d00f7",
        pointRadius: 0,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 350);
          gradient.addColorStop(0, "rgba(0, 76, 153, 0.8)");
          gradient.addColorStop(1, "rgba(51, 0, 102, 0.0)");
          return gradient;
        },
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
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
    tension: 0.5,
  };
  return (
    <div
      style={{
        width: "49%",
        background: "#191932",
        borderRadius: "6px",
        height: "400px",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {btcPriceData && (
        <Line
          options={options}
          data={lineChartData}
          style={{ maxHeight: "70%" }}
        />
      )}
    </div>
  );
};

BtcPriceChart.propTypes = {
  btcPriceData: PropTypes.arrayOf(PropTypes.number),
};

export default BtcPriceChart;
