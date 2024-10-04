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
import { abbreviateNumber } from "helper-functions";
import { Coin } from "types";
import { breakpoints } from "breakpoints";
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

const ChartContainer = styled.div<ThemeProp>`
  width: 49%;
  background: ${(props) => (props.light ? "white" : "#191932")};
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

const PriceText = styled.h2`
  font-size: 28px;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 20px;
  }
`;

const DateText = styled.h3`
  font-size: 16px;
  color: gray;
`;

const MobileHeaderTextContainer = styled.div`
  height: 30%;
  padding: 2.5% 0 0 2.5%;
  display: flex;
  justify-content: space-around;
`;

const MobilePriceDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const MobileDateText = styled.div`
  font-size: 12px;
  margin-right: auto;
`;

const MobileCoinText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const TwoCoinsHeader = styled.p<ThemeProp>`
  font-size: 24px;
  color: ${(props) => (props.light ? "#353570" : "white")};
  margin: 2.5% 0 0 2.5%;
`;

type CoinPriceDataTypes = {
  price: number;
  date: string;
};

type BtcPriceChartProps = {
  selectedCoin: Coin[];
  coinPriceData: CoinPriceDataTypes[][];
};

type ThemeProp = {
  light: boolean;
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
    <ChartContainer light={theme === "light"}>
      {size.width < parseInt(breakpoints.mobile) &&
        selectedCoin.length === 1 && (
          <>
            <MobileHeaderTextContainer>
              <MobileCoinText>{selectedCoin[0].name}</MobileCoinText>
              <MobilePriceDateContainer>
                <PriceText>
                  ${abbreviateNumber(selectedCoin[0].current_price)}
                </PriceText>
                <MobileDateText>{new Date().toDateString()}</MobileDateText>
              </MobilePriceDateContainer>
            </MobileHeaderTextContainer>
            <Line
              options={options}
              data={lineChartData}
              style={{ maxHeight: "70%", padding: "2.5%" }}
            />
          </>
        )}

      {size.width < parseInt(breakpoints.mobile) &&
        selectedCoin.length === 2 && (
          <>
            <MobileHeaderTextContainer>
              <MobileDateText>{new Date().toDateString()}</MobileDateText>
              <MobilePriceDateContainer></MobilePriceDateContainer>
            </MobileHeaderTextContainer>
            <Line
              options={options}
              data={lineChartData}
              style={{ maxHeight: "70%", padding: "2.5%" }}
            />
          </>
        )}

      {size.width > parseInt(breakpoints.mobile) &&
        selectedCoin.length === 1 && (
          <>
            <HeaderTextContainer>
              <CoinText>{selectedCoin[0].name}</CoinText>
              <PriceText>
                ${abbreviateNumber(selectedCoin[0].current_price)}
              </PriceText>
              <DateText>{new Date().toDateString()}</DateText>
            </HeaderTextContainer>
            <Line
              options={options}
              data={lineChartData}
              style={{ maxHeight: "70%", padding: "2.5%" }}
            />
          </>
        )}

      {size.width > parseInt(breakpoints.mobile) &&
        selectedCoin.length === 2 && (
          <>
            <TwoCoinsHeader light={theme === "light"}>
              {new Date().toDateString()}
            </TwoCoinsHeader>
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
    </ChartContainer>
  );
};

export default BtcPriceChart;
