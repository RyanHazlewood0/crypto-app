import { createContext, useContext } from "react";
import { useState } from "react";

const CoinContext = createContext();

export const useCoin = () => {
  const value = useContext(CoinContext);
  return value;
};

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);

  return (
    <CoinContext.Provider
      value={{
        coins,
        setCoins,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};

CoinProvider.propTypes = {
  children: PropTypes.node,
};
