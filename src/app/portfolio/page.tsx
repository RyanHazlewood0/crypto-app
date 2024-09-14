"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import AddAssetForm from "./AddAssetForm/AddAssetForm";
import CoinEntry from "./CoinEntry/CoinEntry";
import { PortfolioCoin } from "./AddAssetForm/AddAssetForm";
import MobileButtons from "../components/MobileButtons/MobileButtons";

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

export default function Portfolio() {
  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioCoin[] | []>(
    []
  );
  const [formOpen, setFormOpen] = useState(false);
  const [coinSelectValue, setCoinSelectValue] = useState("");
  const [purchasedAmountValue, setPurchasedAmountValue] = useState<string>("");
  const [purchaseDateValue, setPurchaseDateValue] = useState<null | string>(
    null
  );
  const [isEditOpen, setIsEditOpen] = useState(false);

  let fixedDates: PortfolioCoin[];
  if (typeof window !== "undefined") {
    const storedCoins: PortfolioCoin[] =
      JSON.parse(localStorage.getItem("portCoins")) || [];
    fixedDates = storedCoins.map((el) => {
      return { ...el, purchaseDate: new Date(el.purchaseDate) };
    });
  }

  useEffect(() => {
    if (fixedDates) {
      setPortfolioCoins(fixedDates);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portCoins", JSON.stringify(portfolioCoins));
    }
  }, [portfolioCoins]);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setCoinSelectValue("");
    setPurchaseDateValue(null);
    setPurchasedAmountValue(null);
    setIsEditOpen(false);
  };

  const editCoinEntry = (
    e: React.MouseEvent<HTMLButtonElement>,
    coin: PortfolioCoin
  ) => {
    setFormOpen(true);
    setCoinSelectValue(coin.name);
    setPurchaseDateValue(coin.purchaseDate.toISOString().split("T")[0]);
    setPurchasedAmountValue(coin.totalAmount.toString());
    setIsEditOpen(true);
  };

  const sortedPortfolioCoins: [] | PortfolioCoin[] = [...portfolioCoins].sort(
    (a, b) => b.totalValue - a.totalValue
  );

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
            isEditOpen={isEditOpen}
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
          isEditOpen={isEditOpen}
        />
      )}
      <MobileButtons />
    </>
  );
}
