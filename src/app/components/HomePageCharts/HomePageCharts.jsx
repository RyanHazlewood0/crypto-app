import styled from "styled-components";
import BtcPriceChart from "../BtcPriceChart/BtcPriceChart";
import BtcVolumeChart from "../BtcVolumeChart/BtcVolumeChart";
import { useEffect, useState } from "react";

const ChartsContainer = styled.div`
  width: 100%;
  display: flex;
`;

const HomePageCharts = () => {
  const [hasError, setHasError] = useState(false);
  const [btcPriceData, setBtcPriceData] = useState(null);
  const [btcVolumeData, setBtcVolumeData] = useState(null);

  useEffect(() => {
    setHasError(false);
    const getBtcData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
        );
        const fetchedData = await response.json();
        setBtcPriceData(fetchedData.prices.map((price) => price[1]));
        setBtcVolumeData(fetchedData.total_volumes.map((volume) => volume[1]));
      } catch {
        setHasError(true);
      }
    };
    getBtcData();
  }, []);

  return (
    <ChartsContainer>
      {hasError && <p>Error loading chart data</p>}
      {btcPriceData && <BtcPriceChart btcPriceData={btcPriceData} />}
      {btcVolumeData && <BtcVolumeChart btcVolumeData={btcVolumeData} />}
    </ChartsContainer>
  );
};

export default HomePageCharts;
