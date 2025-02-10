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
import { abbreviateNumber } from "helper-functions";
import { Coin } from "types";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
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

const ChartContainer = styled.div<ThemeProp>`
  width: 49%;
  background: ${(props) => (props.$light ? "white" : "#191932")};
  border-radius: 6px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mobile}) {
    height: 200px;
    width: 100%;
  }
`;

const HeaderTextContainer = styled.div`
  height: 30%;
  padding: 2.5% 0 0 2.5%;
`;

const CoinText = styled.h1`
  font-size: 24px;
  color: gray;
  margin-bottom: 10px;
`;

const VolumeText = styled.h2`
  font-size: 28px;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const DateText = styled.p`
  font-size: 16px;
  color: gray;
`;

const MobileHeaderTextContainer = styled.div`
  height: 30%;
  padding: 2.5% 0 0 2.5%;
  display: flex;
  justify-content: space-around;
`;

const MobileDateText = styled.div`
  margin-right: auto;
  font-size: 12px;
`;

const MobileCoinText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const TwoCoinsHeader = styled.p<ThemeProp>`
  font-size: 24px;
  color: ${(props) => (props.$light ? "#353570" : "white")};
`;

const TwoCoinsHeadCont = styled.div`
  display: flex;
  align-items: baseline;
  margin: 2.5% 0 0 2.5%;
  gap: 15px;
`;

interface CoinVolumeDataTypes {
  volume: number;
  date: string;
}

interface BtcVolumeChartProps {
  selectedCoin: Coin[];
  coinVolumeData: CoinVolumeDataTypes[][];
}

type ThemeProp = {
  $light: boolean;
};

const BtcVolumeChart = ({
  coinVolumeData,
  selectedCoin,
}: BtcVolumeChartProps) => {
  const [coinColor1, setCoinColor1] = useState("#a100f2");
  const [coinColor2, setCoinColor2] = useState("#ff758f");
  const size = useWindowSize();
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
    <ChartContainer $light={theme === "light"}>
      {size.width > parseInt(breakpoints.mobile) &&
        selectedCoin.length === 1 && (
          <HeaderTextContainer>
            <CoinText>Volume 24h</CoinText>
            <VolumeText>
              ${abbreviateNumber(selectedCoin[0].total_volume)}
            </VolumeText>
            <DateText>{new Date().toDateString()}</DateText>
          </HeaderTextContainer>
        )}

      {size.width < parseInt(breakpoints.mobile) &&
        selectedCoin.length === 1 && (
          <MobileHeaderTextContainer>
            <MobileCoinText>{selectedCoin[0].name}</MobileCoinText>
            <div>
              <VolumeText>
                ${abbreviateNumber(selectedCoin[0].total_volume)}
              </VolumeText>
              <MobileDateText>{new Date().toDateString()}</MobileDateText>
            </div>
          </MobileHeaderTextContainer>
        )}

      {size.width < parseInt(breakpoints.mobile) &&
        selectedCoin.length === 2 && (
          <MobileHeaderTextContainer>
            <MobileDateText>{new Date().toDateString()}</MobileDateText>
          </MobileHeaderTextContainer>
        )}

      {size.width > parseInt(breakpoints.mobile) &&
        selectedCoin.length === 2 && (
          <TwoCoinsHeadCont>
            <TwoCoinsHeader $light={theme === "light"}>
              Volume 24h
            </TwoCoinsHeader>
            <DateText>{new Date().toDateString()}</DateText>
          </TwoCoinsHeadCont>
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
    </ChartContainer>
  );
};

export default BtcVolumeChart;
