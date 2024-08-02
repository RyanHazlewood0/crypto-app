import PropTypes from "prop-types";
import styled from "styled-components";
import BtcPriceChart from "../BtcPriceChart/BtcPriceChart";
import BtcVolumeChart from "../BtcVolumeChart/BtcVolumeChart";
import { useEffect, useState } from "react";

const ChartsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 40px 0 50px 0;
`;

const HomePageCharts = ({ selectedCoin, dayCount }) => {
  const [hasError, setHasError] = useState(false);
  const [coinPriceData, setCoinPriceData] = useState(null);
  const [coinVolumeData, setCoinVolumeData] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setHasError(false);
    const getCoinData = async () => {
      try {
        const response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=usd&days=${dayCount}&interval=daily&x_cg_pro_api_key=${apiKey}`
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
  }, [selectedCoin, dayCount]);
  return (
    <ChartsContainer>
      {hasError && <p>Error loading chart data...</p>}
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
  );
};

export default HomePageCharts;

HomePageCharts.propTypes = {
  selectedCoin: PropTypes.object,
  dayCount: PropTypes.string,
};
