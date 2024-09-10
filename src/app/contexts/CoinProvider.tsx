"use client";
import { createContext, useContext, useEffect } from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { CoinTypes } from "types";

interface CoinContextType {
  coins: CoinTypes[];
  selectedBtn: string;
  setCoins: Dispatch<SetStateAction<CoinTypes[]>>;
  setSelectedBtn: Dispatch<SetStateAction<string>>;
  useCurrencyStorage: any;
  setFiatCurrency: any;
  fiatCurrency: any;
}

const CoinContext = createContext<CoinContextType | null>(null);

export const useCoin = (): CoinContextType => {
  const value = useContext(CoinContext);
  return value;
};

type useCoinProps = {
  children: React.ReactNode;
};

const getSavedValue = (key, initialValue) => {
  if (typeof window !== "undefined") {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) {
      return savedValue;
    }
    if (initialValue instanceof Function) return initialValue();
    return initialValue;
  }
};

const useCurrencyStorage = (key, initialvalue) => {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialvalue);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue];
};

export const CoinProvider = ({ children }: useCoinProps) => {
  const [coins, setCoins] = useState<CoinTypes[]>([]);
  const [selectedBtn, setSelectedBtn] = useState<string>("Coins");
  const [fiatCurrency, setFiatCurrency] = useCurrencyStorage(
    "fiatCurrency",
    "usd"
  );

  return (
    <CoinContext.Provider
      value={{
        coins,
        setCoins,
        selectedBtn,
        setSelectedBtn,
        useCurrencyStorage,
        setFiatCurrency,
        fiatCurrency,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
