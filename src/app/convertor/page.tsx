"use client";
import CoinsAndConverterBtns from "../components/CoinsAndConverterBtns/CoinsAndConverterBtns";
import ConverterChart from "./ConverterChart/ConverterChart";
import ConverterTimeSelect from "./ConverterTimeSelect/ConverterTimeSelect";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { CoinTypes, useCoin } from "../contexts/CoinProvider";

const ConverterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 70px;
`;

const ConverterBox = styled.div<StyleProp>`
  width: 636px;
  height: 200px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.sell ? "#191932" : "#1E1932")};
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
`;

const CurrencyAndPriceText = styled.p`
  font-size: 14px;
`;

const ReverseConvertBtn = styled.div`
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

const DropDown = styled.div`
  margin-top: 5px;
  width: 178.8px;
  background: #191925;
  padding: 10px;
  border-radius: 6px;
  background: ##191925;
  position: absolute;
  z-index.: 1;
  margin-top: 40px;
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SellAmountInput = styled.input`
  border: solid 1px gray;
  border-radius: 6px;
  background: #191932;
`;

const BuyAmountInput = styled.input`
  border: solid 1px gray;
  border-radius: 6px;
  background: #191932;
`;

const CoinContainer = styled.div`
  display: flex;
  width: 150px;
  align-items: center;
  gap: 5px;
`;

const CoinText = styled.p`
  font-size: 20px;
`;

const ArrowText = styled.p`
  font-size: 20px;
  cursor: pointer;
`;

const CoinOption = styled.p`
  cursor: pointer;
`;

const CoinLogo = styled.img`
  width: 24px;
  height: 24px;
`;

type StyleProp = {
  sell?: boolean;
};

export default function Converter() {
  const [buyCoin, setBuyCoin] = useState<CoinTypes | null>(null);
  const [sellCoin, setSellCoin] = useState<CoinTypes | null>(null);
  const [buySearch, setBuySearch] = useState("");
  const [sellSearch, setSellSearch] = useState("");
  const [timeFrameSelected, setTimeFrameSelected] = useState("1Y");
  const [dayCount, setDayCount] = useState("365");
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
  const [sellQuantity, setSellQuantity] = useState<number | null>(null);
  const [buyQuantity, setBuyQuantity] = useState<number | null>(null);

  const { coins } = useCoin();

  useEffect(() => {
    if (coins.length > 0) {
      setSellCoin(coins[0]);
      setBuyCoin(coins[1]);
    }
  }, []);

  const date = new Date();
  const currentDate = date.toLocaleString();

  const handleBuySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBuySearch(value);
    if (e.target.value.length !== 0) {
      setBuyDropdownOpen(true);
    } else {
      setBuyDropdownOpen(false);
    }
  };

  const handleSellSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSellSearch(value);
    if (e.target.value.length !== 0) {
      setSellDropdownOpen(true);
    } else {
      setSellDropdownOpen(false);
    }
  };

  const filteredBuyCoins = coins.filter(
    (coin) =>
      coin.id.includes(buySearch) ||
      coin.symbol.includes(buySearch) ||
      coin.name.includes(buySearch)
  );

  const filteredSellCoins = coins.filter(
    (coin) =>
      coin.id.includes(sellSearch) ||
      coin.symbol.includes(sellSearch) ||
      coin.name.includes(sellSearch)
  );

  const selectCoinSell = (coin: CoinTypes) => {
    setSellCoin(coin);
    setSellDropdownOpen(false);
  };

  const selectCoinBuy = (coin: CoinTypes) => {
    setBuyCoin(coin);
    setBuyDropdownOpen(false);
  };

  const clearBuyCoin = () => {
    setBuyCoin(null);
    setBuySearch("");
  };

  const clearSellCoin = () => {
    setSellCoin(null);
    setSellSearch("");
  };

  const handleSellQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSellQuantity(Number(value));
  };

  const handleBuyQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBuyQuantity(Number(value));
  };

  const convertToSell = () => {
    const sellCoinPrice = sellCoin.current_price;
    const sellCoinValue = sellCoinPrice * sellQuantity;
    const buyCoinPrice = buyCoin.current_price;
    const result = sellCoinValue / buyCoinPrice;
    setBuyQuantity(parseFloat(result.toFixed(3)));
  };

  const handleSellQuantityBlur = () => {
    convertToSell();
  };

  const convertToBuy = () => {
    const buyCoinPrice = buyCoin.current_price;
    const buyCoinValue = buyCoinPrice * buyQuantity;
    const sellCoinPrice = sellCoin.current_price;
    const result = buyCoinValue / sellCoinPrice;
    setSellQuantity(parseFloat(result.toFixed(3)));
  };

  const handleBuyQuantityBlur = () => {
    convertToBuy();
  };

  const reverseConvert = () => {
    setBuyCoin(sellCoin);
    setSellCoin(buyCoin);
    setSellSearch(buySearch);
    setBuySearch(sellSearch);
    setBuyQuantity(sellQuantity);
    setSellQuantity(buyQuantity);
  };

  return (
    <>
      <CoinsAndConverterBtns />
      <Title>Cryptocurrency Converter</Title>
      <DateText>{currentDate}</DateText>
      <ConverterContainer>
        <ConverterBox sell>
          <InnerContainer>
            <BuySellText>You Sell</BuySellText>
            <DropDownContainer>
              <SearchAndValueContainer>
                {sellCoin ? (
                  <CoinContainer>
                    <CoinLogo src={sellCoin.image} />
                    <CoinText>{sellCoin.name}</CoinText>
                    <CoinText>({sellCoin.symbol.toUpperCase()})</CoinText>
                    <ArrowText onClick={clearSellCoin}>▼</ArrowText>
                  </CoinContainer>
                ) : (
                  <SearchInput
                    value={sellSearch}
                    onChange={(e) => handleSellSearch(e)}
                    placeholder="Search Coin..."
                  />
                )}

                <SellAmountInput
                  placeholder="Add Quanitity..."
                  value={sellQuantity}
                  onChange={(e) => handleSellQuantity(e)}
                  onBlur={() => handleSellQuantityBlur()}
                  type="number"
                />
              </SearchAndValueContainer>
              {sellDropdownOpen && (
                <DropDown>
                  {filteredSellCoins.map((coin) => (
                    <CoinOption
                      key={coin.id}
                      onClick={() => selectCoinSell(coin)}
                    >
                      {coin.name}
                    </CoinOption>
                  ))}
                </DropDown>
              )}
            </DropDownContainer>
            <HorizontalLine />
            {sellCoin !== null ? (
              <CurrencyAndPriceText>
                1 {sellCoin.symbol.toUpperCase()} = ${sellCoin.current_price}
              </CurrencyAndPriceText>
            ) : (
              <CurrencyAndPriceText>0</CurrencyAndPriceText>
            )}
          </InnerContainer>
        </ConverterBox>
        <ReverseConvertBtn onClick={() => reverseConvert()}>
          <p>↑↓</p>
        </ReverseConvertBtn>
        <ConverterBox>
          <InnerContainer>
            <BuySellText>You Buy</BuySellText>
            <DropDownContainer>
              <SearchAndValueContainer>
                {buyCoin ? (
                  <CoinContainer>
                    <CoinLogo src={buyCoin.image} />
                    <CoinText>{buyCoin.name}</CoinText>
                    <CoinText>({buyCoin.symbol.toUpperCase()})</CoinText>
                    <ArrowText onClick={clearBuyCoin}>▼</ArrowText>
                  </CoinContainer>
                ) : (
                  <SearchInput
                    value={buySearch}
                    onChange={(e) => handleBuySearch(e)}
                    placeholder="Search Coin..."
                  />
                )}
                <BuyAmountInput
                  placeholder="Add Quanitity..."
                  value={buyQuantity}
                  onChange={(e) => handleBuyQuantity(e)}
                  onBlur={() => handleBuyQuantityBlur()}
                  type="number"
                />
              </SearchAndValueContainer>
              {buyDropdownOpen && (
                <DropDown>
                  {filteredBuyCoins.map((coin) => (
                    <CoinOption
                      key={coin.id}
                      onClick={() => selectCoinBuy(coin)}
                    >
                      {coin.name}
                    </CoinOption>
                  ))}
                </DropDown>
              )}
            </DropDownContainer>
            <HorizontalLine />
            {buyCoin !== null ? (
              <CurrencyAndPriceText>
                1 {buyCoin.symbol.toUpperCase()} = ${buyCoin.current_price}
              </CurrencyAndPriceText>
            ) : (
              <CurrencyAndPriceText>0</CurrencyAndPriceText>
            )}
          </InnerContainer>
        </ConverterBox>
      </ConverterContainer>
      <ConverterChart
        dayCount={dayCount}
        buyCoin={buyCoin}
        sellCoin={sellCoin}
      />
      <ConverterTimeSelect
        timeFrameSelected={timeFrameSelected}
        setTimeFrameSelected={setTimeFrameSelected}
        setDayCount={setDayCount}
      />
    </>
  );
}
