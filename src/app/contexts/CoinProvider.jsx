"use client";
import { createContext, useContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const CoinContext = createContext();

export const useCoin = () => {
  const value = useContext(CoinContext);
  return value;
};

export const CoinProvider = ({ children }) => {
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

CoinProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
