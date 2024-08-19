"use client";
import { useEffect } from "react";
import { useState } from "react";
import { CoinProvider } from "./contexts/CoinProvider";
import "./globals.css";
import styled from "styled-components";
import MarketDataBar from "./components/MarketDataBar/MarketDataBar";
import NavBar from "./components/NavBar/NavBar";

const MainContainer = styled.div`
  max-width: 1296px;
  margin-left: auto;
  margin-right: auto;
`;

type RootLayoutProps = {
  children: React.ReactNode;
};

export interface MarketDataTypes {
  coins: string;
  totalMarketCap: string;
  totalVolume: string;
  btcPercent: number;
  ethPercent: number;
}

interface FetchedDataTypes {
  data: {
    total_market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    market_cap_percentage: {
      eth: number;
      btc: number;
    };
    active_cryptocurrencies: number;
  };
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [marketData, setMarketData] = useState<MarketDataTypes | null>(null);
  const [hasError, setHasError] = useState(false);

  function abbreviateNumber(num: number): string {
    const prefixes = ["", "k", "M", "B", "T"];
    const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
    const abbreviated = (num / Math.pow(1000, magnitude)).toFixed(2);
    return `${abbreviated}${prefixes[magnitude]}`;
  }

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
            {children}
          </MainContainer>
        </CoinProvider>
      </body>
    </html>
  );
}
