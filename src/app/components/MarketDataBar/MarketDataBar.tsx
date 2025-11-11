"use client";
import React from "react";
import { useEffect, useState } from "react";
import CoinCount from "./svg/CoinCount";
import Btc from "./svg/Btc";
import Eth from "./svg/Eth";
import TotalVol from "./svg/TotalVol";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { CurrencyValue } from "types";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

export type FetchedDataTypes = {
  data: {
    total_market_cap: CurrencyValue;
    total_volume: CurrencyValue;
    market_cap_percentage: {
      eth: number;
      btc: number;
    };
    active_cryptocurrencies: number;
  };
};

export type MarketDataTypes = {
  coins: string;
  totalMarketCap: string;
  totalVolume: string;
  btcPercent: number;
  ethPercent: number;
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
      <div
        className={`${
          theme === "light" ? "bg-[#353570]" : "bg-[#1e1932]"
        } w-full h-12 flex items-center text-white`}
      >
        Loading...
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className={`${
          theme === "light" ? "bg-[#353570]" : "bg-[#1e1932]"
        } w-full h-12 flex items-center text-white`}
      >
        Error fetching market data...
      </div>
    );
  }

  if (marketData) {
    return (
      <div
        className={`${
          theme === "light" ? "bg-[#353570]" : "bg-[#1e1932]"
        } w-full flex items-center text-white`}
      >
        <div className="w-full md:max-w-2xl flex justify-between m-auto px-4 py-2">
          <div className={"flex items-center"}>
            <div className="mr-[5px]">
              <TotalVol />
            </div>
            <div>${marketData.totalVolume}</div>
          </div>
          <div className={"flex items-center"}>
            <div className="mr-[5px]">
              <Btc />
            </div>
            <div>{marketData.btcPercent}%</div>
          </div>
          <div className={"flex items-center"}>
            <div className="mr-[5px]">
              <Eth />
            </div>
            <div>{marketData.ethPercent}%</div>
          </div>
        </div>
      </div>
    );
  }
};

export default MarketDataBar;
