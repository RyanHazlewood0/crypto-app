import { PortfolioCoin } from "types";
import styled from "styled-components";
import { breakpoints } from "breakpoints";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import {
  Chart as ChartJS,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Chart,
  ChartType,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

declare module "chart.js" {
  interface PluginOptionsByType<TType extends ChartType> {
    centerText?: {
      theme?: string;
    };
  }
}

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChartContainer = styled.div<ThemeProp>`
  width: 49%;
  background: ${(props) => (props.$light ? "white" : "#191932")};
  border-radius: 6px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  @media (max-width: ${breakpoints.mobile}) {
    height: 200px;
    width: 100%;
  }
`;

const DetailsContainer = styled.div<ThemeProp>`
  width: 49%;
  background: ${(props) => (props.$light ? "white" : "#191932")};
  border-radius: 6px;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
  @media (max-width: ${breakpoints.mobile}) {
    height: 200px;
    width: 100%;
  }
`;

const CoinContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CoinTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5px;
`;

const CoinText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const SymbolText = styled.p`
  font-size: 16px;
  color: gray;
`;

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart: Chart<"doughnut">) {
    const { ctx, chartArea } = chart;
    const { width, height } = chartArea;

    const totalValue = chart.data.datasets[0].data.reduce(
      (sum, value) => sum + (value as number),
      0
    );

    const formattedValue = `$${totalValue.toFixed(2)}`;

    ctx.save();

    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const theme = chart.options.plugins?.centerText?.theme || "light";
    ctx.fillStyle = theme === "light" ? "black" : "white";

    const centerX = width / 2 + chartArea.left;
    const centerY = height / 2 + chartArea.top;

    ctx.fillText(formattedValue, centerX, centerY);

    ctx.restore();
  },
};

interface PercentageBreakdownProps {
  portfolioCoins: PortfolioCoin[];
}

type ThemeProp = {
  $light: boolean;
};

const PercentageBreakdown = ({ portfolioCoins }: PercentageBreakdownProps) => {
  const { theme } = useCryptoContext();

  const doughnutChartData = {
    labels: portfolioCoins.map((coin) => coin.name),
    datasets: [
      {
        label: null,
        data: portfolioCoins.map((coin) => coin.totalValue),
        borderColor: "#2d00f7",
        pointRadius: 0,
        backgroundColor: portfolioCoins.map((_, index) => {
          const hue = (index * 137.5) % 360;
          return `hsla(${hue}, 70%, 50%, 0.8)`;
        }),
        fill: true,
      },
    ],
  };

  return (
    <MainContainer>
      <ChartContainer $light={theme === "light"}>
        <Doughnut
          data={doughnutChartData}
          plugins={[centerTextPlugin]}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                enabled: true,
              },
              centerText: {
                theme,
              },
            },
          }}
        />
      </ChartContainer>
      <DetailsContainer $light={theme === "light"}>
        <CoinText>Portfolio Percentage Breakdown:</CoinText>
        {portfolioCoins.map((coin) => (
          <CoinContainer key={coin.id}>
            <CoinTextContainer>
              <CoinText>{coin.name}</CoinText>
              <SymbolText>
                {coin.symbol.charAt(0).toUpperCase()}
                {coin.symbol.slice(1)}
              </SymbolText>
            </CoinTextContainer>
            <CoinText>{coin.percentOfTotal.toFixed(2)}%</CoinText>
          </CoinContainer>
        ))}
      </DetailsContainer>
    </MainContainer>
  );
};

export default PercentageBreakdown;
