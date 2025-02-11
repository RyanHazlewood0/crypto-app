"use client";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CoinCount from "./svg/CoinCount";
import Btc from "./svg/Btc";
import Eth from "./svg/Eth";
import TotalVol from "./svg/TotalVol";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { CurrencyValue } from "types";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

const MarketDataBarWrapper = styled.div<ThemeProp>`
  background: ${(props) => (props.$light ? "#353570" : "#1e1932")};
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  color: white;
`;

const MarketDataBarInnerWrapper = styled.div`
  display: flex;
  max-width: 1440px;
  width: 50%;
  justify-content: space-between;
  margin: auto;
  @media (max-width: ${breakpoints.mobile}) {
    width: 375px;
    justify-content: space-between;
  }
`;

const IndividualMarketDataWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SvgWrapper = styled.div`
  margin-right: 5px;
`;

export interface FetchedDataTypes {
  data: {
    total_market_cap: CurrencyValue;
    total_volume: CurrencyValue;
    market_cap_percentage: {
      eth: number;
      btc: number;
    };
    active_cryptocurrencies: number;
  };
}

export interface MarketDataTypes {
  coins: string;
  totalMarketCap: string;
  totalVolume: string;
  btcPercent: number;
  ethPercent: number;
}

type ThemeProp = {
  $light?: boolean;
};

const MarketDataBar = () => {
  const [marketData, setMarketData] = useState<MarketDataTypes | null>(null);
  const [hasError, setHasError] = useState(false);
  const { theme, fiatCurrency, abbreviateNumber } = useCryptoContext();
  const size = useWindowSize();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const getMarketData = async () => {
      setHasError(false);
      try {
        const response = await fetch(
          `https://pro-api.coingecko.com/api/v3/global?x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData: FetchedDataTypes = await response.json();
        const totalCap = abbreviateNumber(
          fetchedData.data.total_market_cap[fiatCurrency]
        );
        const totalVol = abbreviateNumber(
          fetchedData.data.total_volume[fiatCurrency]
        );
        const updatedMarketData = {
          coins: Math.round(
            fetchedData.data.active_cryptocurrencies
          ).toLocaleString(),
          btcPercent: Math.round(fetchedData.data.market_cap_percentage.btc),
          ethPercent: Math.round(fetchedData.data.market_cap_percentage.eth),
          totalMarketCap: totalCap,
          totalVolume: totalVol,
        };
        setMarketData(updatedMarketData);
      } catch {
        setHasError(true);
      }
    };
    getMarketData();
  }, [fiatCurrency]);

  if (!marketData) {
    return (
      <MarketDataBarWrapper $light={theme === "light"}>
        Loading...
      </MarketDataBarWrapper>
    );
  }

  if (hasError) {
    return (
      <MarketDataBarWrapper $light={theme === "light"}>
        Error fetching market data...
      </MarketDataBarWrapper>
    );
  }

  if (marketData) {
    return (
      <MarketDataBarWrapper $light={theme === "light"}>
        <MarketDataBarInnerWrapper>
          {size.width > parseInt(breakpoints.mobile) && (
            <>
              <IndividualMarketDataWrapper>
                <SvgWrapper>
                  <CoinCount />
                </SvgWrapper>
                <div>Coins {marketData.coins}</div>
              </IndividualMarketDataWrapper>
              <IndividualMarketDataWrapper>
                <div>${marketData.totalMarketCap}</div>
              </IndividualMarketDataWrapper>
            </>
          )}

          <IndividualMarketDataWrapper>
            <SvgWrapper>
              <TotalVol />
            </SvgWrapper>
            <div>${marketData.totalVolume}</div>
          </IndividualMarketDataWrapper>
          <IndividualMarketDataWrapper>
            <SvgWrapper>
              <Btc />
            </SvgWrapper>
            <div>{marketData.btcPercent}%</div>
          </IndividualMarketDataWrapper>
          <IndividualMarketDataWrapper>
            <SvgWrapper>
              <Eth />
            </SvgWrapper>
            <div>{marketData.ethPercent}%</div>
          </IndividualMarketDataWrapper>
        </MarketDataBarInnerWrapper>
      </MarketDataBarWrapper>
    );
  }
};

export default MarketDataBar;
