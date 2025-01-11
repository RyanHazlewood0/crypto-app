"use client";
import { createContext, useContext, useEffect } from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { Coin } from "types";
import {
  MarketDataTypes,
  FetchedDataTypes,
} from "../components/MarketDataBar/MarketDataBar";

interface CryptoContextType {
  coins: Coin[];
  selectedBtn: string;
  setCoins: Dispatch<SetStateAction<Coin[]>>;
  setSelectedBtn: Dispatch<SetStateAction<string>>;
  setFiatCurrency: Dispatch<SetStateAction<string>>;
  fiatCurrency: string;
  isClient: any;
  selectedMobileBtn: string;
  setSelectedMobileBtn: Dispatch<SetStateAction<string>>;
  selectedNavLink: string;
  setSelectedNavLink: Dispatch<SetStateAction<string>>;
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  toggleTheme: any;
  marketData: MarketDataTypes;
}

const CryptoContext = createContext<CryptoContextType | null>(null);

export const useCryptoContext = (): CryptoContextType => {
  const value = useContext(CryptoContext);
  return value;
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CacheData {
  data: Coin[];
  timestamp: number;
  currency: string;
}

interface MarketCacheData {
  data: {
    coins: string;
    btcPercent: number;
    ethPercent: number;
    totalMarketCap: string;
    totalVolume: string;
  };
  timestamp: number;
  currency: string;
}

const getCachedMarketData = (): MarketCacheData | null => {
  const cached = localStorage.getItem("cachedMarketData");
  if (!cached) return null;

  const parsedCache = JSON.parse(cached) as MarketCacheData;
  const isExpired = Date.now() - parsedCache.timestamp > CACHE_DURATION;

  return isExpired ? null : parsedCache;
};

const getCachedCoins = (): CacheData | null => {
  const cached = localStorage.getItem("cachedCoins");
  if (!cached) return null;

  const parsedCache = JSON.parse(cached) as CacheData;
  const isExpired = Date.now() - parsedCache.timestamp > CACHE_DURATION;

  return isExpired ? null : parsedCache;
};

type useCryptoContextProps = {
  children: React.ReactNode;
};

export const CryptoProvider = ({ children }: useCryptoContextProps) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedBtn, setSelectedBtn] = useState<string>("Coins");
  const [fiatCurrency, setFiatCurrency] = useState("usd");
  const [isClient, setIsClient] = useState(false);
  const [selectedMobileBtn, setSelectedMobileBtn] = useState("Overview");
  const [selectedNavLink, setSelectedNavLink] = useState("Home");
  const [theme, setTheme] = useState("light");
  const [marketData, setMarketData] = useState<MarketDataTypes | null>(null);

  function abbreviateNumber(num: number): string {
    const prefixes = ["", "k", "M", "B", "T"];
    const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
    const abbreviated = (num / Math.pow(1000, magnitude)).toFixed(2);
    return `${abbreviated}${prefixes[magnitude]}`;
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem("themeStyle");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isClient) {
        localStorage.setItem("themeStyle", theme);
      }
    }
  }, [theme]);

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [theme]);

  useEffect(() => {
    setIsClient(true);
    const savedFiat = localStorage.getItem("fiat");
    if (savedFiat) {
      setFiatCurrency(savedFiat);
    }
  }, []);

  useEffect(() => {
    const getMarketData = async () => {
      const cachedData = getCachedMarketData();
      if (cachedData && cachedData.currency === fiatCurrency) {
        setMarketData(cachedData.data);
        return;
      }
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global");
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
        const cacheData: MarketCacheData = {
          data: updatedMarketData,
          timestamp: Date.now(),
          currency: fiatCurrency,
        };
        localStorage.setItem("cachedMarketData", JSON.stringify(cacheData));
      } catch {
        const expiredCache = localStorage.getItem("cachedCoins");
        if (expiredCache) {
          const { data } = JSON.parse(expiredCache);
          setCoins(data);
        }
      }
    };
    getMarketData();
  }, [fiatCurrency]);

  useEffect(() => {
    const api = async (url: string) => {
      const data = await fetch(url);
      const json: Coin[] = await data.json();
      return json;
    };

    const fetchData = async () => {
      const cachedData = getCachedCoins();
      if (cachedData && cachedData.currency === fiatCurrency) {
        setCoins(cachedData.data);
        return;
      }
      try {
        const one = await api(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        const two = await api(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=2&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        const three = await api(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=3&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        const four = await api(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=4&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
        );
        const allCoins = [...one, ...two, ...three, ...four];
        setCoins(allCoins);
        const cacheData: CacheData = {
          data: allCoins,
          timestamp: Date.now(),
          currency: fiatCurrency,
        };
        localStorage.setItem("cachedCoins", JSON.stringify(cacheData));
      } catch {
        const expiredCache = localStorage.getItem("cachedCoins");
        if (expiredCache) {
          const { data } = JSON.parse(expiredCache);
          setCoins(data);
        }
      }
    };
    fetchData();
  }, [fiatCurrency]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isClient) {
        localStorage.setItem("fiat", fiatCurrency);
      }
    }
  }, [fiatCurrency]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.body.classList.add("light-mode");
    } else if (theme === "light") {
      setTheme("dark");
      document.body.classList.remove("light-mode");
    }
  };

  return (
    <CryptoContext.Provider
      value={{
        coins,
        setCoins,
        selectedBtn,
        setSelectedBtn,
        setFiatCurrency,
        fiatCurrency,
        isClient,
        selectedMobileBtn,
        setSelectedMobileBtn,
        selectedNavLink,
        setSelectedNavLink,
        theme,
        setTheme,
        toggleTheme,
        marketData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
