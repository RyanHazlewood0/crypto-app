import PropTypes from "prop-types";
import styled from "styled-components";
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

const ChartContainer = styled.div`
  width: 49%;
  background: #191932;
  border-radius: 6px;
  height: 400px;
  display: flex;
  align-items: flex-end;
  position: relative;
`;

const ChartHeader = styled.h1`
  font-size: 24px;
  position: absolute;
`;

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
    <ChartContainer>
      <ChartHeader>Bitcoin</ChartHeader>
      <Bar options={options} data={barChartData} style={{ maxHeight: "70%" }} />
    </ChartContainer>
  );
};

BtcVolumeChart.propTypes = {
  btcVolumeData: PropTypes.arrayOf(PropTypes.number),
};

export default BtcVolumeChart;
