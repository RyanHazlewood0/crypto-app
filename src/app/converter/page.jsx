"use client";
import CoinsAndConverterBtns from "../components/CoinsAndConverterBtns/CoinsAndConverterBtns";
import ConverterChart from "./ConverterChart/ConverterChart";
import ConverterTimeSelect from "./ConverterTimeSelect/ConverterTimeSelect";
import styled from "styled-components";
import { useState } from "react";

const ConverterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 70px;
`;

const ConverterBox = styled.div`
  width: 636px;
  height: 200px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const DateText = styled.p`
  color: #9e9e9e;
  font-size: 16px;
  margin-bottom: 15px;
`;

const BuySellText = styled.p`
  font-size: 14px;
  color: #9e9e9e;
  margin-bottom: 15px;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 30%;
  border: solid 1px gray;
  border-radius: 6px;
  background: #191932;
`;

const SearchAndValueContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const HorizontalLine = styled.hr`
  color: white;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const ValueText = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

const CurrencyAndPriceText = styled.p`
  font-size: 14px;
`;

const ConvertBtn = styled.div`
  background: white;
  border-radius: 50px;
  width: 48px;
  height: 48px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0 auto 0;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translate(-24px, -24px);
  top: 50%;
`;

export default function Converter() {
  //const [buyCoin, setBuyCoin] = useState(null);
  //const [sellCoin, setSellCoin] = useState(null);
  const [buySearch, setBuySearch] = useState("");
  const [sellSearch, setSellSearch] = useState("");
  const [timeFrameSelected, setTimeFrameSelected] = useState("1M");
  //const [dayCount, setDayCount] = useState("30");

  const date = new Date();
  const currentDate = date.toLocaleString();

  const handleBuySearch = (e) => {
    const value = e.target.value;
    setBuySearch(value);
  };

  const handleSellSearch = (e) => {
    const value = e.target.value;
    setSellSearch(value);
  };

  return (
    <>
      <CoinsAndConverterBtns />
      <Title>Cryptocurrency Converter</Title>
      <DateText>{currentDate}</DateText>
      <ConverterContainer>
        <ConverterBox style={{ background: "#191932" }}>
          <InnerContainer>
            <BuySellText>You Buy</BuySellText>
            <SearchAndValueContainer>
              <SearchInput
                value={buySearch}
                onChange={(e) => handleBuySearch(e)}
              />
              <ValueText>$5,000</ValueText>
            </SearchAndValueContainer>
            <HorizontalLine />
            <CurrencyAndPriceText>1 BTC = $20,000</CurrencyAndPriceText>
          </InnerContainer>
        </ConverterBox>
        <ConvertBtn>
          <p>↑↓</p>
        </ConvertBtn>
        <ConverterBox style={{ background: "#1E1932" }}>
          <InnerContainer>
            <BuySellText>You Buy</BuySellText>
            <SearchAndValueContainer>
              <SearchInput
                value={sellSearch}
                onChange={(e) => handleSellSearch(e)}
              />
              <ValueText>$5,000</ValueText>
            </SearchAndValueContainer>
            <HorizontalLine />
            <CurrencyAndPriceText>1 BTC = $20,000</CurrencyAndPriceText>
          </InnerContainer>
        </ConverterBox>
      </ConverterContainer>
      <ConverterChart />
      <ConverterTimeSelect
        timeFrameSelected={timeFrameSelected}
        setTimeFrameSelected={setTimeFrameSelected}
        setDayCount={setDayCount}
      />
    </>
  );
}
