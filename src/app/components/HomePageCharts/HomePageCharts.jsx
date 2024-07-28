import PropTypes from "prop-types";
import styled from "styled-components";
import BtcPriceChart from "../BtcPriceChart/BtcPriceChart";
import BtcVolumeChart from "../BtcVolumeChart/BtcVolumeChart";
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

  useEffect(() => {
    setHasError(false);
    const getCoinData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=180&interval=daily`
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
    <ChartsContainer>
      {hasError && <p>Error loading chart data</p>}
      {coinPriceData && <BtcPriceChart coinPriceData={coinPriceData} />}
      {coinVolumeData && <BtcVolumeChart coinVolumeData={coinVolumeData} />}
    </ChartsContainer>
  );
};

export default HomePageCharts;

HomePageCharts.propTypes = {
  selectedCoin: PropTypes.string,
};
