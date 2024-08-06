import PropTypes from "prop-types";
import styled from "styled-components";
import { useState, useEffect } from "react";
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
  width: 100%;
  height: 293px;
  background: #191932;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 35px;

  canvas {
    width: 100% !important;
  }
`;

const ConverterChart = ({ dayCount, sellCoin }) => {
  const [sellCoinPriceData, setSellCoinPriceData] = useState(null);
  //const [buyCoinPriceData, setBuyCoinPriceData] = useState(null);
  const [hasError, setHasError] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setHasError(false);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/${sellCoin.id}/market_chart?vs_currency=usd&days=${dayCount}&interval=daily&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData = await response.json();
        setSellCoinPriceData(fetchedData);
      } catch {
        setHasError(true);
      }
    };
    fetchData();
  }, [sellCoin, dayCount]);

  const lineChartData = {
    labels: sellCoinPriceData
      ? sellCoinPriceData.prices.map((array) =>
          new Date(array[0]).toDateString()
        )
      : ["1,2"],
    datasets: [
      {
        label: null,
        data: sellCoinPriceData
          ? sellCoinPriceData.prices.map((obj) => obj[1].toFixed(2))
          : ["1,2"],
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
    maintainAspectRatio: false,
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
    <>
      <ChartContainer>
        {hasError && <p>Error loading chart data...</p>}
        {sellCoinPriceData && (
          <Line
            options={options}
            data={lineChartData}
            style={{ maxHeight: "100%" }}
          />
        )}
      </ChartContainer>
    </>
  );
};

ConverterChart.propTypes = {
  dayCount: PropTypes.string,
  sellCoin: PropTypes.object,
  // buyCoin: PropTypes.object,
};

export default ConverterChart;
