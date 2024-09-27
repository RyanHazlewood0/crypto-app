import styled from "styled-components";
import BtcPriceChart from "./BtcPriceChart/BtcPriceChart";
import BtcVolumeChart from "./BtcVolumeChart/BtcVolumeChart";
import { useEffect, useState } from "react";
import { Coin } from "types";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { breakpoints } from "breakpoints";

const ChartsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 40px 0 50px 0;
  @media (max-width: ${breakpoints.mobile}) {
    width: 375px;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

const MessageText = styled.p`
  font-size: 35px;
  font-weight: bold;
`;

interface HomePageChartsProps {
  selectedCoin: Coin;
  dayCount: String;
}

export interface FetchedDataTypes {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

interface CoinPriceDataTypes {
  price: number;
  date: string;
}

interface coinVolumeDataTypes {
  volume: number;
  date: string;
}

const HomePageCharts = ({ selectedCoin, dayCount }: HomePageChartsProps) => {
  const [hasError, setHasError] = useState(false);
  const [coinPriceData, setCoinPriceData] = useState<
    CoinPriceDataTypes[] | null
  >(null);
  const [coinVolumeData, setCoinVolumeData] = useState<
    coinVolumeDataTypes[] | null
  >(null);

  const { fiatCurrency } = useCryptoContext();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const getCoinData = async () => {
      setHasError(false);

      try {
        const response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=${fiatCurrency}&days=${dayCount}&interval=daily&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData: FetchedDataTypes = await response.json();
        setCoinPriceData(
          fetchedData.prices.map((price) => {
            const fromTimestamp = (timestamp: number): Date =>
              new Date(timestamp);
            return {
              price: price[1],
              date: fromTimestamp(price[0]).toDateString(),
            };
          })
        );
        setCoinVolumeData(
          fetchedData.total_volumes.map((volume) => {
            const fromTimestamp = (timestamp: number): Date =>
              new Date(timestamp);
            return {
              volume: volume[1],
              date: fromTimestamp(volume[0]).toDateString(),
            };
          })
        );
      } catch {
        if (selectedCoin && dayCount) {
          setHasError(true);
        }
      }
    };
    getCoinData();
  }, [selectedCoin, dayCount, fiatCurrency]);

  if (hasError) {
    return <MessageText>Error loading data...</MessageText>;
  }

  return (
    <ChartsContainer>
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
