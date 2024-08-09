"use client";
import { useState } from "react";
//import { useCoin } from "../contexts/CoinProvider";
import styled from "styled-components";
import AddAssetForm from "../components/AddAssetForm/AddAssetForm";

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

const CoinEntryContainer = styled.div`
  width: 100%;
  height: 292px;
  display: flex;
`;

const CoinImageContainer = styled.div`
  width: 258px;
  height: 100%;
  background: #1e1932;
`;

const CoinInfoContainer = styled.div`
  width: 1038px;
  height: 100%;
  background: #2f184b;
  padding: 20px;
`;

export default function Portfolio() {
  //const [portfolioCoins, setPortfolioCoins] = useState();
  const [formOpen, setFormOpen] = useState(false);
  const [CoinSelectValue, setCoinSelectValue] = useState("");
  const [purchasedAmountValue, setPurchasedAmountValue] = useState("");
  const [purchaseDateValue, setPurchaseDateValue] = useState("");

  // const { coins } = useCoin();

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setCoinSelectValue("");
    setPurchaseDateValue("");
    setPurchasedAmountValue("");
  };

  const handleCoinSelectInputChange = (e) => {
    const value = e.target.value;
    setCoinSelectValue(value);
  };

  const handlePurchaseAmountInputChange = (e) => {
    const value = e.target.value;
    setPurchasedAmountValue(value);
  };

  const handlePurchaseDateInputChange = (e) => {
    const value = e.target.value;
    setPurchaseDateValue(value);
  };

  const handleSubmit = () => {};

  return (
    <>
      <HeaderContainer>
        <HeaderText>Portfolio</HeaderText>
        <AddBtn onClick={handleFormOpen}>Add Asset</AddBtn>
      </HeaderContainer>
      <CoinEntryContainer>
        <CoinImageContainer>logo</CoinImageContainer>
        <CoinInfoContainer>info</CoinInfoContainer>
      </CoinEntryContainer>
      {formOpen && (
        <AddAssetForm
          handleFormClose={handleFormClose}
          CoinSelectValue={CoinSelectValue}
          purchasedAmountValue={purchasedAmountValue}
          purchaseDateValue={purchaseDateValue}
          handleCoinSelectInputChange={handleCoinSelectInputChange}
          handlePurchaseAmountInputChange={handlePurchaseAmountInputChange}
          handlePurchaseDateInputChange={handlePurchaseDateInputChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}
