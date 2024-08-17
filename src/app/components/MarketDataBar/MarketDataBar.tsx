"use client";
import React from "react";
import styled from "styled-components";
import CoinCount from "./svg/CoinCount";
import Btc from "./svg/Btc";
import Eth from "./svg/Eth";
import TotalVol from "./svg/TotalVol";
import { MarketDataTypes } from "@/app/layout";

const MarketDataBarWrapper = styled.div`
  background: #1e1932;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
`;

const MarketDataBarInnerWrapper = styled.div`
  display: flex;
  max-width: 1440px;
  width: 50%;
  justify-content: space-between;
  margin: auto;
`;

const IndividualMarketDataWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SvgWrapper = styled.div`
  margin-right: 5px;
`;

type MarketDataBarProps = {
  marketData: MarketDataTypes;
  hasError: boolean;
};

const MarketDataBar = ({ marketData, hasError }: MarketDataBarProps) => {
  if (!marketData) {
    return <MarketDataBarWrapper>Loading...</MarketDataBarWrapper>;
  }
  return hasError ? (
    <MarketDataBarWrapper>Market Data Loading Error</MarketDataBarWrapper>
  ) : (
    <MarketDataBarWrapper>
      <MarketDataBarInnerWrapper>
        <IndividualMarketDataWrapper>
          <SvgWrapper>
            <CoinCount />
          </SvgWrapper>
          <div>Coins {marketData.coins}</div>
        </IndividualMarketDataWrapper>
        <IndividualMarketDataWrapper>
          <div>${marketData.totalMarketCap}</div>
        </IndividualMarketDataWrapper>
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
};

export default MarketDataBar;
