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

  align-items: flex-end;
`;

const HeaderTextContainer = styled.div`
  height: 30%;
  padding: 15px 0 0 15px;
`;

const CoinText = styled.h1`
  font-size: 24px;
  color: gray;
  margin-bottom: 10px;
`;

const VolumeText = styled.h2`
  font-size: 28px;
`;

const DateText = styled.h3`
  font-size: 16px;
  color: gray;
`;

const BtcVolumeChart = ({ coinVolumeData, selectedCoin }) => {
  const barChartData = {
    labels: coinVolumeData.map((obj) => obj.date),
    datasets: [
      {
        label: null,
        data: coinVolumeData.map((obj) => obj.volume),
        backgroundColor: "#240046",
        borderColor: "#a663cc",
        borderWidth: 2,
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
      <HeaderTextContainer>
        <CoinText>{selectedCoin.name}</CoinText>
        <VolumeText>{selectedCoin.total_volume}</VolumeText>
        <DateText>{new Date().toDateString()}</DateText>
      </HeaderTextContainer>
      <Bar options={options} data={barChartData} style={{ maxHeight: "70%" }} />
    </ChartContainer>
  );
};

BtcVolumeChart.propTypes = {
  coinVolumeData: PropTypes.arrayOf(PropTypes.number),
  selectedCoin: PropTypes.object,
};

export default BtcVolumeChart;
