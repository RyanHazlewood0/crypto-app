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
import { Coin } from "types";
import { FetchedDataTypes } from "@/app/components/HomePageCharts/HomePageCharts";
import { breakpoints } from "breakpoints";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";

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

const ChartContainer = styled.div<ThemeProp>`
  width: 100%;
  height: 293px;
  background: ${(props) => (props.light ? "white" : "#191932")};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 35px;

  canvas {
    width: 100% !important;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 375px;
    margin-bottom: 16px;
    padding: 10px;
  }
`;

const ErrorText = styled.p`
  margin-bottom: 15px;
`;

interface ConverterChartProps {
  dayCount: string;
  buyCoin: Coin;
  sellCoin: Coin;
}

type ThemeProp = {
  light: boolean;
};

const ConverterChart = ({
  dayCount,
  buyCoin,
  sellCoin,
}: ConverterChartProps) => {
  const [sellCoinPriceData, setSellCoinPriceData] =
    useState<FetchedDataTypes | null>(null);
  const [buyCoinPriceData, setBuyCoinPriceData] =
    useState<FetchedDataTypes | null>(null);
  const [hasError, setHasError] = useState(false);
  const [dataSet, setDataSet] = useState(null);

  const { theme } = useCryptoContext();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setHasError(false);
    const fetchData = async () => {
      try {
        const response: Response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/${sellCoin.id}/market_chart?vs_currency=usd&days=${dayCount}&interval=daily&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData: FetchedDataTypes = await response.json();
        const response2: Response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/${buyCoin.id}/market_chart?vs_currency=usd&days=${dayCount}&interval=daily&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData2: FetchedDataTypes = await response2.json();

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
        if (buyCoinPriceData.prices.length > Number(dayCount)) {
          const convertedPrices = sellCoinPriceData.prices.map(
            (price, index) => {
              const sellPrice = price[1];
              const buyPrice = buyCoinPriceData.prices[index][1];
              return sellPrice / buyPrice;
            }
          );
          setDataSet(convertedPrices);
        }
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
        data: dataSet ? dataSet.map((price: number) => price.toFixed(2)) : [],
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
  } as any;

  if (sellCoinPriceData && buyCoinPriceData) {
    if (
      buyCoinPriceData.prices.length < Number(dayCount) ||
      sellCoinPriceData.prices.length < Number(dayCount)
    ) {
      return (
        <ErrorText>
          Coin doesn{"'"}t have {dayCount} days long price history, select a
          shorter price history setting for this coin.
        </ErrorText>
      );
    }
  }

  if (hasError) {
    <ErrorText>error fetching coin data</ErrorText>;
  }

  return (
    <>
      <ChartContainer light={theme === "light"}>
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

export default ConverterChart;
