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
  const [fiatCurrency, setFiatCurrency] = useState(
    localStorage.getItem("fiat") || "usd"
  );

  return (
    <CoinContext.Provider
      value={{
        coins,
        setCoins,
        selectedBtn,
        setSelectedBtn,
        setFiatCurrency,
        fiatCurrency,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
