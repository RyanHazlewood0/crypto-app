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
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
  );
};

export default PercentageBreakdown;
