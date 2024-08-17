"use client";
import { createContext, useContext } from "react";
import { useState, Dispatch, SetStateAction } from "react";

export interface CoinTypes {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  price_change_percent_24h: number;
  circulating_supply: number;
  total_supply: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: {
    price: number[];
  };
}

interface CoinContextType {
  coins: CoinTypes[];
  selectedBtn: string;
  setCoins: Dispatch<SetStateAction<CoinTypes[]>>;
  setSelectedBtn: Dispatch<SetStateAction<string>>;
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

  return (
    <CoinContext.Provider
      value={{
        coins,
        setCoins,
        selectedBtn,
        setSelectedBtn,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
