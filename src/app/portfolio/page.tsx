"use client";
import { useState } from "react";
import styled from "styled-components";
import AddAssetForm from "./AddAssetForm/AddAssetForm";

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
  const [formOpen, setFormOpen] = useState(false);
  const [CoinSelectValue, setCoinSelectValue] = useState("");
  const [purchasedAmountValue, setPurchasedAmountValue] = useState("");
  const [purchaseDateValue, setPurchaseDateValue] = useState("");

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setCoinSelectValue("");
    setPurchaseDateValue("");
    setPurchasedAmountValue("");
  };

  const handleCoinSelectInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCoinSelectValue(value);
  };

  const handlePurchaseAmountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPurchasedAmountValue(value);
  };

  const handlePurchaseDateInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPurchaseDateValue(value);
  };

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
        />
      )}
    </>
  );
}
