"use client";
import { createContext, useContext, useEffect, useLayoutEffect } from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { CoinTypes } from "types";

interface CoinContextType {
  coins: CoinTypes[];
  selectedBtn: string;
  setCoins: Dispatch<SetStateAction<CoinTypes[]>>;
  setSelectedBtn: Dispatch<SetStateAction<string>>;
  setFiatCurrency: any;
  fiatCurrency: any;
  isClient: any;
  selectedMobileBtn: any;
  setSelectedMobileBtn: any;
  selectedNavLink: any;
  setSelectedNavLink: any;
  theme: string;
  setTheme: any;
  toggleTheme: any;
}

const CoinContext = createContext<CoinContextType | null>(null);

export const useCoin = (): CoinContextType => {
  const value = useContext(CoinContext);
  return value;
};

type useCoinProps = {
  children: React.ReactNode;
};

export const CoinProvider = ({ children }: useCoinProps) => {
  const [coins, setCoins] = useState<CoinTypes[]>([]);
  const [selectedBtn, setSelectedBtn] = useState<string>("Coins");
  const [fiatCurrency, setFiatCurrency] = useState("usd");
  const [isClient, setIsClient] = useState(false);
  const [selectedMobileBtn, setSelectedMobileBtn] = useState("Overview");
  const [selectedNavLink, setSelectedNavLink] = useState("Home");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.classList.add("light-mode");
  }, []);

  useEffect(() => {
    setIsClient(true);
    const savedFiat = localStorage.getItem("fiat");
    if (savedFiat) {
      setFiatCurrency(savedFiat);
    }
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const api = async (url: string) => {
      const data = await fetch(url);
      const json: CoinTypes[] = await data.json();
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
    <CoinContext.Provider
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
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
