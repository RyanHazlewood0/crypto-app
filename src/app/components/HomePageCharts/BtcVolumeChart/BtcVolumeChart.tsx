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
import { abbreviateNumber } from "helper-functions";
import { Coin } from "types";
import { breakpoints } from "breakpoints";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { useState } from "react";
import TwoCoinsText from "./TwoCoinsText";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type CoinVolumeDataTypes = {
  volume: number;
  date: string;
};

type BtcVolumeChartProps = {
  selectedCoin: Coin[];
  coinVolumeData: CoinVolumeDataTypes[][];
};

const BtcVolumeChart = ({
  coinVolumeData,
  selectedCoin,
}: BtcVolumeChartProps) => {
  const [coinColor1, setCoinColor1] = useState("#a100f2");
  const [coinColor2, setCoinColor2] = useState("#ff758f");
  const { theme } = useCryptoContext();

  const barChartData = {
    labels: coinVolumeData[0].map((obj) => obj.date),
    datasets:
      coinVolumeData.length === 2
        ? [
            {
              label: null,
              data: coinVolumeData[0].map((obj) => obj.volume),
              backgroundColor: coinColor1,
              borderColor: "none",
              borderWidth: 0,
            },
            {
              label: null,
              data: coinVolumeData[1].map((obj) => obj.volume),
              backgroundColor: coinColor2,
              borderColor: "none",
              borderWidth: 0,
            },
          ]
        : [
            {
              label: null,
              data: coinVolumeData[0].map((obj) => obj.volume),
              backgroundColor: coinColor1,
              borderColor: "none",
              borderWidth: 0,
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
      className={`w-full h-[200px] flex flex-col justify-between md:h-[400px] rounded-lg ${
        theme === "light" ? "bg-white" : "bg-[#191932]"
      }`}
    >
      {selectedCoin.length === 1 && (
        <div className={"py-[2.5%] h-[30%] flex justify-around items-center"}>
          <p className={"text-gray-500 text-[24px] mb-[10px]"}>Volume 24h</p>
          <div className={"flex flex-col justify-around"}>
            <p className={"text-[20px] md:text-[28px]"}>
              ${abbreviateNumber(selectedCoin[0].total_volume)}
            </p>
            <p className={"text-gray-500 md:text-[16px]"}>
              {new Date().toDateString()}
            </p>
          </div>
        </div>
      )}

      {selectedCoin.length === 2 && (
        <div className={"items-baseline flex gap-[15px] my-[2.5%]"}>
          <p
            className={`text-[24px] ${
              theme === "light" ? "text-[#353570]" : "bg-text-white"
            }`}
          >
            Volume 24h
          </p>
          <p className={"text-gray-500 md:text-[16px]"}>
            {new Date().toDateString()}
          </p>
        </div>
      )}

      <Bar
        options={options}
        data={barChartData}
        style={{ maxHeight: "70%", padding: "2.5%" }}
      />
      <TwoCoinsText
        selectedCoin={selectedCoin}
        coinColor1={coinColor1}
        setCoinColor1={setCoinColor1}
        coinColor2={coinColor2}
        setCoinColor2={setCoinColor2}
      />
    </div>
  );
};

export default BtcVolumeChart;
