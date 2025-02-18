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

type HomePageChartsProps = {
  selectedCoin: Coin[];
  dayCount: String;
};

export type FetchedDataTypes = {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

type CoinPriceDataTypes = {
  price: number;
  date: string;
};

type CoinVolumeDataTypes = {
  volume: number;
  date: string;
};

const HomePageCharts = ({ selectedCoin, dayCount }: HomePageChartsProps) => {
  const [hasError, setHasError] = useState(false);
  const [coinPriceData, setCoinPriceData] = useState<
    CoinPriceDataTypes[][] | null
  >(null);
  const [coinVolumeData, setCoinVolumeData] = useState<
    CoinVolumeDataTypes[][] | null
  >(null);

  const { fiatCurrency } = useCryptoContext();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const getCoinData = async () => {
      setHasError(false);

      if (selectedCoin.length === 1) {
        const singleCoin = selectedCoin[0];
        try {
          const response = await fetch(
            `https://pro-api.coingecko.com/api/v3/coins/${singleCoin.id}/market_chart?vs_currency=${fiatCurrency}&days=${dayCount}&interval=daily&x_cg_pro_api_key=${apiKey}`
          );
          const fetchedData = await response.json();

          const priceResult = fetchedData.prices.map((price) => {
            const fromTimestamp = (timestamp: number): Date =>
              new Date(timestamp);
            return {
              price: price[1],
              date: fromTimestamp(price[0]).toDateString(),
            };
          });
          setCoinPriceData([priceResult]);

          const volResult = fetchedData.total_volumes.map((volume) => {
            const fromTimestamp = (timestamp: number): Date =>
              new Date(timestamp);
            return {
              volume: volume[1],
              date: fromTimestamp(volume[0]).toDateString(),
            };
          });
          setCoinVolumeData([volResult]);
        } catch {
          if (selectedCoin && dayCount) {
            setHasError(true);
          }
        }
      } else if (selectedCoin.length === 2) {
        const coinOne = selectedCoin[0];
        const coinTwo = selectedCoin[1];
        try {
          const response1 = await fetch(
            `https://pro-api.coingecko.com/api/v3/coins/${coinOne.id}/market_chart?vs_currency=${fiatCurrency}&days=${dayCount}&interval=daily&x_cg_pro_api_key=${apiKey}`
          );
          const response2 = await fetch(
            `https://pro-api.coingecko.com/api/v3/coins/${coinTwo.id}/market_chart?vs_currency=${fiatCurrency}&days=${dayCount}&interval=daily&x_cg_pro_api_key=${apiKey}`
          );
          const fetchedDataOne = await response1.json();
          const fetchedDataTwo = await response2.json();

          const partOnePrice = fetchedDataOne.prices.map((price) => {
            const newTimeStampOne = (timestamp) => {
              return new Date(timestamp);
            };
            return {
              price: price[1],
              date: newTimeStampOne(price[0]).toDateString(),
            };
          });

          const partTwoPrice = fetchedDataTwo.prices.map((price) => {
            const newTimeStampTwo = (timestamp) => {
              return new Date(timestamp);
            };
            return {
              price: price[1],
              date: newTimeStampTwo(price[0]).toDateString(),
            };
          });

          setCoinPriceData([partOnePrice, partTwoPrice]);
          const partOneVol = fetchedDataOne.total_volumes.map((volume) => {
            const fromTimeStamp = (timetamp) => {
              return new Date(timetamp);
            };
            return {
              volume: volume[1],
              date: fromTimeStamp(volume[0]).toDateString(),
            };
          });

          const partTwoVol = fetchedDataTwo.total_volumes.map((volume) => {
            const fromTimeStamp = (timetamp) => {
              return new Date(timetamp);
            };
            return {
              volume: volume[1],
              date: fromTimeStamp(volume[0]).toDateString(),
            };
          });

          setCoinVolumeData([partOneVol, partTwoVol]);
        } catch {
          if (selectedCoin && dayCount) {
            setHasError(true);
          }
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
