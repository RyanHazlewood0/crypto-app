"use client";
import { createContext, useContext, useEffect } from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { Coin, WatchListCoin } from "types";

type CryptoContextType = {
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
  abbreviateNumber: (number: number) => string;
  watchListCoins: WatchListCoin[];
  setWatchListCoins: Dispatch<SetStateAction<WatchListCoin[]>>;
};

const CryptoContext = createContext<CryptoContextType | null>(null);

export const useCryptoContext = (): CryptoContextType => {
  const value = useContext(CryptoContext);
  return value;
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
  const [watchListCoins, setWatchListCoins] = useState<WatchListCoin[]>();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

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
    setIsClient(true);
    const savedFiat = localStorage.getItem("fiat");
    if (savedFiat) {
      setFiatCurrency(savedFiat);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isClient) {
        localStorage.setItem("fiat", fiatCurrency);
      }
    }
  }, [fiatCurrency]);

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [theme]);

  useEffect(() => {
    const api = async (url: string) => {
      const data = await fetch(url);
      const json: Coin[] = await data.json();
      return json;
    };

    const fetchData = async () => {
      const one = await api(
        `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
      );
      const two = await api(
        `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=2&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
      );
      const three = await api(
        `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=3&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
      );
      const four = await api(
        `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=4&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
      );
      setCoins([...one, ...two, ...three, ...four]);
    };
    fetchData();
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
        abbreviateNumber,
        watchListCoins,
        setWatchListCoins,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
