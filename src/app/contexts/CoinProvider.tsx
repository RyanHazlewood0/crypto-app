"use client";
import { createContext, useContext } from "react";
import { useState } from "react";

const CoinContext = createContext();

export const useCoin = () => {
  const value = useContext(CoinContext);
  return value;
};

type useCoinProps = {
  children: React.ReactNode;
};

export const CoinProvider = ({ children }: useCoinProps) => {
  const [coins, setCoins] = useState([]);
  const [selectedBtn, setSelectedBtn] = useState("Coins");

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
