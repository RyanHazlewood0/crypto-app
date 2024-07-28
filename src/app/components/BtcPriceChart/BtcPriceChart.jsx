import PropTypes from "prop-types";
import styled from "styled-components";
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

const PriceText = styled.h2`
  font-size: 28px;
`;

const DateText = styled.h3`
  font-size: 16px;
  color: gray;
`;

const BtcPriceChart = ({ coinPriceData }) => {
  const lineChartData = {
    labels: coinPriceData.map((obj) => obj.date),
    datasets: [
      {
        label: null,
        data: coinPriceData.map((obj) => obj.price.toFixed()),
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
    <ChartContainer>
      <HeaderTextContainer>
        <CoinText>Bitcoin</CoinText>
        <PriceText>$60,000</PriceText>
        <DateText>July 29 2024</DateText>
      </HeaderTextContainer>
      {coinPriceData && (
        <Line
          options={options}
          data={lineChartData}
          style={{ maxHeight: "70%" }}
        />
      )}
    </ChartContainer>
  );
};

BtcPriceChart.propTypes = {
  coinPriceData: PropTypes.arrayOf(PropTypes.number),
};

export default BtcPriceChart;
