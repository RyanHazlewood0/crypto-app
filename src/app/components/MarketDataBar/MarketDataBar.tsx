"use client";
import React from "react";
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
  const { theme, marketData } = useCryptoContext();
  const size = useWindowSize();

  if (!marketData) {
    return (
      <MarketDataBarWrapper $light={theme === "light"}>
        Loading...
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
