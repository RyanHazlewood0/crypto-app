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
import { abbreviateNumber } from "../../Table/helper-functions";
import { CoinTypes } from "types";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import { useCoin } from "@/app/contexts/CoinProvider";

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
  background: ${(props) => (props.light ? "white" : "#191932")};
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

const VolumeText = styled.h2`
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

const MobileVolDateContainer = styled.div`
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

interface CoinVolumeDataTypes {
  volume: number;
  date: string;
}

interface BtcVolumeChartProps {
  selectedCoin: CoinTypes;
  coinVolumeData: CoinVolumeDataTypes[];
}

type ThemeProp = {
  light: boolean;
};

const BtcVolumeChart = ({
  coinVolumeData,
  selectedCoin,
}: BtcVolumeChartProps) => {
  const size = useWindowSize();
  const { theme } = useCoin();

  const findBackground = () => {
    if (theme === "light") {
      return "#a100f2";
    } else {
      return "#240046";
    }
  };

  const findBorder = () => {
    if (theme === "light") {
      return "#0c0a3e";
    } else {
      return "#a663cc";
    }
  };

  const barChartData = {
    labels: coinVolumeData.map((obj) => obj.date),
    datasets: [
      {
        label: null,
        data: coinVolumeData.map((obj) => obj.volume),
        backgroundColor: findBackground(),
        borderColor: findBorder(),
        borderWidth: 2,
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
    <ChartContainer light={theme === "light"}>
      {size.width < parseInt(breakpoints.mobile) && (
        <MobileHeaderTextContainer>
          <MobileCoinText>{selectedCoin.name}</MobileCoinText>
          <MobileVolDateContainer>
            <VolumeText>
              ${abbreviateNumber(selectedCoin.total_volume)}
            </VolumeText>
            <MobileDateText>{new Date().toDateString()}</MobileDateText>
          </MobileVolDateContainer>
        </MobileHeaderTextContainer>
      )}
      {size.width > parseInt(breakpoints.mobile) && (
        <HeaderTextContainer>
          <CoinText>{selectedCoin.name}</CoinText>
          <VolumeText>
            ${abbreviateNumber(selectedCoin.total_volume)}
          </VolumeText>
          <DateText>{new Date().toDateString()}</DateText>
        </HeaderTextContainer>
      )}
      <Bar
        options={options}
        data={barChartData}
        style={{ maxHeight: "70%", padding: "2.5%" }}
      />
    </ChartContainer>
  );
};

export default BtcVolumeChart;
