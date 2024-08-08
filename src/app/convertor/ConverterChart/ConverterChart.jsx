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

const ErrorText = styled.p`
  margin-bottom: 15px;
`;
const ChartMessage = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

const ConverterChart = ({ dayCount, buyCoin, sellCoin }) => {
  const [sellCoinPriceData, setSellCoinPriceData] = useState(null);
  const [buyCoinPriceData, setBuyCoinPriceData] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [dataSet, setDataSet] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setHasError(false);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/${sellCoin.id}/market_chart?vs_currency=usd&days=${dayCount}&interval=daily&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData = await response.json();
        const response2 = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/${buyCoin.id}/market_chart?vs_currency=usd&days=${dayCount}&interval=daily&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData2 = await response2.json();
        setSellCoinPriceData(fetchedData);
        setBuyCoinPriceData(fetchedData2);
      } catch {
        setHasError(true);
      }
    };
    fetchData();
  }, [sellCoin, buyCoin, dayCount]);

  useEffect(() => {
    const setData = () => {
      if (sellCoinPriceData && buyCoinPriceData) {
        const convertedPrices = sellCoinPriceData.prices.map((price, index) => {
          const sellPrice = price[1];
          const buyPrice = buyCoinPriceData.prices[index][1];
          return sellPrice / buyPrice;
        });
        setDataSet(convertedPrices);
      }
    };
    setData();
  }, [sellCoinPriceData]);

  const lineChartData = {
    labels: sellCoinPriceData
      ? sellCoinPriceData.prices.map((array) =>
          new Date(array[0]).toDateString()
        )
      : [],
    datasets: [
      {
        label:
          buyCoin && sellCoin
            ? "1" + " " + sellCoin.name + " " + "to" + " " + `${buyCoin.name}`
            : "",
        data: dataSet ? dataSet.map((price) => price.toFixed(2)) : [],
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
        {hasError && <ErrorText>Error fetching data for chart</ErrorText>}
        {(!sellCoin || !buyCoin) && (
          <ChartMessage>Select two coins to show chart</ChartMessage>
        )}
        {buyCoin && sellCoin ? (
          <Line
            options={options}
            data={lineChartData}
            style={{ maxHeight: "100%" }}
          />
        ) : (
          ""
        )}
      </ChartContainer>
    </>
  );
};

ConverterChart.propTypes = {
  dayCount: PropTypes.string,
  sellCoin: PropTypes.object,
  buyCoin: PropTypes.object,
};

export default ConverterChart;
