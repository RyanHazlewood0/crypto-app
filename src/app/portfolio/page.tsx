"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import AddAssetForm from "./AddAssetForm/AddAssetForm";
import CoinEntry from "./CoinEntry/CoinEntry";
import { PortfolioCoin } from "./AddAssetForm/AddAssetForm";
import { useCoin } from "../contexts/CoinProvider";
import { CoinTypes } from "types";

const HeaderContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const HeaderText = styled.h1`
  font-size: 20px;
`;

const AddBtn = styled.button`
  width: 244px;
  height: 100%;
  border-radius: 6px;
  background: #6161d6;
`;

const LoadingMessage = styled.p`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
`;

export default function Portfolio() {
  const [coinsData, setCoinsData] = useState<CoinTypes[]>([]);
  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioCoin[] | []>(
    []
  );
  const [formOpen, setFormOpen] = useState(false);
  const [coinSelectValue, setCoinSelectValue] = useState("");
  const [purchasedAmountValue, setPurchasedAmountValue] = useState<string>("");
  const [purchaseDateValue, setPurchaseDateValue] = useState<null | string>(
    null
  );
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { fiatCurrency } = useCoin();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const fetchedData1 = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
        );
        const coinData1 = await fetchedData1.json();
        const fetchedData2 = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=2&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
        );
        const coinData2 = await fetchedData2.json();
        const fetchedData3 = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=3&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
        );
        const coinData3 = await fetchedData3.json();
        const fetchedData4 = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=250&page=4&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
        );
        const coinData4 = await fetchedData4.json();
        setCoinsData([...coinData1, ...coinData2, ...coinData3, ...coinData4]);
        setIsLoading(false);
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fiatCurrency]);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setCoinSelectValue("");
    setPurchaseDateValue(null);
    setPurchasedAmountValue(null);
  };

  const editCoinEntry = (
    e: React.MouseEvent<HTMLButtonElement>,
    coin: PortfolioCoin
  ) => {
    setFormOpen(true);
    setCoinSelectValue(coin.name);
    setPurchaseDateValue(coin.purchaseDate.toISOString().split("T")[0]);
    setPurchasedAmountValue(coin.totalAmount.toString());
  };

  const sortedPortfolioCoins: [] | PortfolioCoin[] = [...portfolioCoins].sort(
    (a, b) => b.totalValue - a.totalValue
  );

  if (isLoading) {
    return <LoadingMessage>Fetching coin data...</LoadingMessage>;
  }

  if (hasError) {
    return <p>Error fetching data...</p>;
  }

  return (
    <>
      <HeaderContainer>
        <HeaderText>Portfolio</HeaderText>
        <AddBtn onClick={handleFormOpen}>Add Asset</AddBtn>
      </HeaderContainer>

      {sortedPortfolioCoins &&
        sortedPortfolioCoins.map((coin: PortfolioCoin) => (
          <CoinEntry
            coin={coin}
            key={coin.name}
            portfolioCoins={portfolioCoins}
            setPortfolioCoins={setPortfolioCoins}
            editCoinEntry={editCoinEntry}
          />
        ))}
      {formOpen && (
        <AddAssetForm
          handleFormClose={handleFormClose}
          purchasedAmountValue={purchasedAmountValue}
          purchaseDateValue={purchaseDateValue}
          setPurchasedAmountValue={setPurchasedAmountValue}
          setPurchaseDateValue={setPurchaseDateValue}
          setPortfolioCoins={setPortfolioCoins}
          portfolioCoins={portfolioCoins}
          coinSelectValue={coinSelectValue}
          setCoinSelectValue={setCoinSelectValue}
          coinsData={coinsData}
        />
      )}
    </>
  );
}
