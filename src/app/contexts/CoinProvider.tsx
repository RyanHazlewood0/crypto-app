"use client";
import { createContext, useContext } from "react";
import { useState, Dispatch, SetStateAction } from "react";
import { CoinTypes } from "types";

interface CoinContextType {
  coins: CoinTypes[];
  selectedBtn: string;
  setCoins: Dispatch<SetStateAction<CoinTypes[]>>;
  setSelectedBtn: Dispatch<SetStateAction<string>>;
  fiatCurrency: string;
  setFiatCurrency: Dispatch<SetStateAction<string>>;
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
  const [fiatCurrency, setFiatCurrency] = useState<string>("usd");

  return (
    <CoinContext.Provider
      value={{
        coins,
        setCoins,
        selectedBtn,
        setSelectedBtn,
        fiatCurrency,
        setFiatCurrency,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
