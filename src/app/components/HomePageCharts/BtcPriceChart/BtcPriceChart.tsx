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
import { abbreviateNumber } from "../../Table/helper-functions";
import { CoinTypes } from "types";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

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
`;

const MobileCoinText = styled.div`
  font-size: 18px;
`;

type CoinPriceDataTypes = {
  price: number;
  date: string;
};

type BtcPriceChartProps = {
  selectedCoin: CoinTypes;
  coinPriceData: CoinPriceDataTypes[];
};

const BtcPriceChart = ({ coinPriceData, selectedCoin }: BtcPriceChartProps) => {
  const size = useWindowSize();

  const lineChartData = {
    labels: coinPriceData.map((obj) => obj.date),
    datasets: [
      {
        label: null,
        data: coinPriceData.map((obj) => obj.price.toFixed(2)),
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
    <ChartContainer>
      {size.width < parseInt(breakpoints.mobile) && (
        <MobileHeaderTextContainer>
          <MobileCoinText>{selectedCoin.name}</MobileCoinText>
          <MobilePriceDateContainer>
            <PriceText>
              ${abbreviateNumber(selectedCoin.current_price)}
            </PriceText>
            <MobileDateText>{new Date().toDateString()}</MobileDateText>
          </MobilePriceDateContainer>
        </MobileHeaderTextContainer>
      )}
      {size.width > parseInt(breakpoints.mobile) && (
        <HeaderTextContainer>
          <CoinText>{selectedCoin.name}</CoinText>
          <PriceText>${abbreviateNumber(selectedCoin.current_price)}</PriceText>
          <DateText>{new Date().toDateString()}</DateText>
        </HeaderTextContainer>
      )}
      {coinPriceData && (
        <Line
          options={options}
          data={lineChartData}
          style={{ maxHeight: "70%", padding: "2.5%" }}
        />
      )}
    </ChartContainer>
  );
};

export default BtcPriceChart;
