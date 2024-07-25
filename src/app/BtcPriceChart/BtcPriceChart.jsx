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

const BtcPriceChart = () => {
  const [btcData, setBtcData] = useState([]);
  const [hasError, setHasError] = useState(false);

  const prices = btcData.prices;

  const lineChartData = {
    labels: prices.map(() => "price"),
    datasets: [
      {
        data: prices,
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

  useEffect(() => {
    setHasError(false);
    const getBtcData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
        );
        const data = await response.json();
        setBtcData(data);
      } catch {
        setHasError(true);
      }
    };
    getBtcData();
  }, []);

  return (
    <>
      {hasError && <p>Error loading data</p>}
      <Line options={options} data={lineChartData} />
    </>
  );
};

export default BtcPriceChart;
