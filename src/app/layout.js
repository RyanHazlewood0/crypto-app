"use client";
import { useEffect } from "react";
import { useState } from "react";
import { CoinProvider } from "./contexts/CoinProvider";
import "./globals.css";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";
import MarketDataBar from "./components/MarketDataBar/MarketDataBar";
import NavBar from "./components/NavBar/NavBar";

const MainContainer = styled.div`
  max-width: 1296px;
  margin-left: auto;
  margin-right: auto;
`;

const BtnsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const CoinsBtnContainer = styled.div`
  background: #6161d6;
  color: white;
  width: 244px;
  height: 45px;
  font-size: 16px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PortfolioBtnContainer = styled.div`
  background: #232336;
  color: white;
  width: 244px;
  height: 45px;
  font-size: 16px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function RootLayout({ children }) {
  const [marketData, setMarketData] = useState({});
  const [hasError, setHasError] = useState(false);

  function abbreviateNumber(num) {
    const prefixes = ["", "k", "M", "B", "T"];
    const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
    const abbreviated = (num / Math.pow(1000, magnitude)).toFixed(2);
    return `${abbreviated}${prefixes[magnitude]}`;
  }

  useEffect(() => {
    const getMarketData = async () => {
      setHasError(false);
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global");
        const fetchedData = await response.json();
        const totalCap = abbreviateNumber(
          fetchedData.data.total_market_cap.usd
        );
        const totalVol = abbreviateNumber(fetchedData.data.total_volume.usd);
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
  }, []);

  return (
    <html lang="en">
      <body>
        <MarketDataBar marketData={marketData} hasError={hasError} />
        <CoinProvider>
          <MainContainer>
            <NavBar />
            <BtnsContainer>
              <Link href="/">
                <CoinsBtnContainer>Coins</CoinsBtnContainer>
              </Link>
              <Link href="/convertor">
                <PortfolioBtnContainer>Convertor</PortfolioBtnContainer>
              </Link>
            </BtnsContainer>
            {children}
          </MainContainer>
        </CoinProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
