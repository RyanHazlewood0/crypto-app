import PropTypes from "prop-types";
import styled from "styled-components";
import BtcPriceChart from "../BtcPriceChart/BtcPriceChart";
import BtcVolumeChart from "../BtcVolumeChart/BtcVolumeChart";
import HomeChartTimeSelect from "../HomeChartTimeSelect/HomeChartTimeSelect";
import { useEffect, useState } from "react";

const ChartsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const HomePageCharts = ({ selectedCoin }) => {
  const [hasError, setHasError] = useState(false);
  const [coinPriceData, setCoinPriceData] = useState(null);
  const [coinVolumeData, setCoinVolumeData] = useState(null);
  const [TimeFrameSelected, setTimeFrameSelected] = useState(null);

  useEffect(() => {
    setHasError(false);
    const getCoinData = async () => {
      try {
        const response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=usd&days=180&interval=daily&x_cg_pro_api_key=CG-3pE3n6jpPAp5aMpDLciCCcsz`
        );
        const fetchedData = await response.json();
        setCoinPriceData(
          fetchedData.prices.map((price) => {
            const fromTimestamp = (timestamp) => new Date(timestamp);
            return {
              price: price[1],
              date: fromTimestamp(price[0]).toDateString(),
            };
          })
        );
        setCoinVolumeData(
          fetchedData.total_volumes.map((volume) => {
            const fromTimestamp = (timestamp) => new Date(timestamp);
            return {
              volume: volume[1],
              date: fromTimestamp(volume[0]).toDateString(),
            };
          })
        );
      } catch {
        setHasError(true);
      }
    };
    getCoinData();
  }, [selectedCoin]);
  return (
    <div>
      <ChartsContainer>
        {hasError && <p>Error loading chart data</p>}
        {coinPriceData && (
          <BtcPriceChart
            coinPriceData={coinPriceData}
            selectedCoin={selectedCoin}
          />
        )}
        {coinVolumeData && (
          <BtcVolumeChart
            coinVolumeData={coinVolumeData}
            selectedCoin={selectedCoin}
          />
        )}
      </ChartsContainer>
      <HomeChartTimeSelect
        TimeFrameSelected={TimeFrameSelected}
        setTimeFrameSelected={setTimeFrameSelected}
      />
      <ChartsContainer />
    </div>
  );
};

export default HomePageCharts;

HomePageCharts.propTypes = {
  selectedCoin: PropTypes.object,
};
