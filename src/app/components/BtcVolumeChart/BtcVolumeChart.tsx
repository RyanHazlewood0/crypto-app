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
import { abbreviateNumber } from "../Table/helper-functions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  width: 49%;
  background: #191932;
  border-radius: 6px;
  height: 400px;
  align-items: flex-end;
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

type BtcVolumeChartProps = {
  coinVolumeData: {
    volume: number;
    date: string;
  };
  selectedCoin: {
    name: string;
    total_volume: number;
  };
};

const BtcVolumeChart = ({
  coinVolumeData,
  selectedCoin,
}: BtcVolumeChartProps) => {
  const barChartData = {
    labels: coinVolumeData.map((obj) => obj.date),
    datasets: [
      {
        label: null,
        data: coinVolumeData.map((obj) => obj.volume),
        backgroundColor: "#240046",
        borderColor: "#a663cc",
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
    <ChartContainer>
      <HeaderTextContainer>
        <CoinText>{selectedCoin.name}</CoinText>
        <VolumeText>${abbreviateNumber(selectedCoin.total_volume)}</VolumeText>
        <DateText>{new Date().toDateString()}</DateText>
      </HeaderTextContainer>
      <Bar
        options={options}
        data={barChartData}
        style={{ maxHeight: "70%", padding: "2.5%" }}
      />
    </ChartContainer>
  );
};

export default BtcVolumeChart;
