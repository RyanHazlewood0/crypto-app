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
import { abbreviateNumber } from "helper-functions";
import { Coin } from "types";
import useWindowSize from "windowSizeHook";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import TwoCoinsText from "./TwoCoinsText";

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

type CoinPriceDataTypes = {
  price: number;
  date: string;
};

type BtcPriceChartProps = {
  selectedCoin: Coin[];
  coinPriceData: CoinPriceDataTypes[][];
};

type ThemeProp = {
  $light: boolean;
};

const BtcPriceChart = ({ coinPriceData, selectedCoin }: BtcPriceChartProps) => {
  const size = useWindowSize();
  const { theme } = useCryptoContext();

  const lineChartData = {
    labels: coinPriceData[0].map((obj) => obj.date),
    datasets:
      coinPriceData.length === 2
        ? [
            {
              label: null,
              data: coinPriceData[0].map((obj) => obj.price),
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
            {
              label: null,
              data: coinPriceData[1].map((obj) => obj.price),
              borderColor: "#ff0054",
              pointRadius: 0,
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 350);
                gradient.addColorStop(0, "rgba(255, 20, 147, 0.8)");
                gradient.addColorStop(1, "rgba(255, 182, 193, 0.2)");
                return gradient;
              },
              fill: true,
            },
          ]
        : [
            {
              label: null,
              data: coinPriceData[0].map((obj) => obj.price),
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
        mode: "index" as const,
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
      className={`w-full h-[200px] flex flex-col justify-between md:h-[400px] rounded-lg ${
        theme === "light" ? "bg-white" : "bg-[#191932]"
      }`}
    >
      {selectedCoin.length === 1 && (
        <>
          <div className={"py-[2.5%] h-[30%] flex justify-around items-center"}>
            <p className={"text-gray-500 text-[24px]"}>
              {selectedCoin[0].name}
            </p>
            <div className={"flex flex-col justify-around"}>
              <p className={"text-[20px] md:text-[28px]"}>
                ${abbreviateNumber(selectedCoin[0].current_price)}
              </p>
              <p className={"text-[12px] mr-auto"}>
                {new Date().toDateString()}
              </p>
            </div>
          </div>
          <Line
            options={options}
            data={lineChartData}
            style={{ maxHeight: "70%", padding: "2.5%" }}
          />
        </>
      )}

      {selectedCoin.length === 2 && (
        <>
          <div
            className={` my-[2.5%] text-[24px] ${
              theme === "light" ? "text-[#353570]" : " text-white"
            }`}
          >
            {new Date().toDateString()}
          </div>
          <Line
            options={options}
            data={lineChartData}
            style={{
              maxHeight: "70%",
              padding: "2.5%",
            }}
          />
        </>
      )}

      <TwoCoinsText selectedCoin={selectedCoin} />
    </div>
  );
};

export default BtcPriceChart;
