"use client";
import ConverterChart from "./ConverterChart/ConverterChart";
import ConverterTimeSelect from "./ConverterTimeSelect/ConverterTimeSelect";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { Coin } from "types";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import MobileButtons from "../MobileButtons/MobileButtons";

const ConverterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 50px;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }
`;

const ConverterBox = styled.div<ThemeProp>`
  width: 636px;
  height: 200px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.$light ? "white" : "#191932")};
  position: relative;
  @media (max-width: ${breakpoints.mobile}) {
    width: 375px;
  }
`;

const Title = styled.h1`
  font-size: 20px;
`;

const DateText = styled.p<ThemeProp>`
  color: ${(props) => (props.$light ? "#424286" : "#9e9e9e")};
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

const SearchInput = styled.input<ThemeProp>`
  width: 100%;
  border: solid 1px gray;
  border-radius: 6px;
  background: ${(props) => (props.$light ? "#8D8DB1" : "#191932")};
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

const ReverseConvertBtn = styled.div<ThemeProp>`
  background: ${(props) => (props.$light ? "#6161D6" : "white")};
  border-radius: 50px;
  width: 48px;
  height: 48px;
  color: ${(props) => (props.$light ? "white" : "black")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-24px, -24px);
  z-index: 1;
`;

const SellAmountInput = styled.input<ThemeProp>`
  border: solid 1px gray;
  border-radius: 6px;
  background: ${(props) => (props.$light ? "white" : "#191932")};
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 40%;
  }
`;

const BuyAmountInput = styled.input<ThemeProp>`
  border: solid 1px gray;
  border-radius: 6px;
  background: ${(props) => (props.$light ? "white" : "#191932")};
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 40%;
  }
`;

const CoinContainer = styled.div`
  display: flex;
  max-width: 350px;
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

const DropdownAndPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const CoinSearchPopup = styled.div<ThemeProp>`
  border-radius: 6px;
  width: 200px;
  background: ${(props) => (props.$light ? "#8D8DB1" : "#191925")};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  height: 90px;
  position: absolute;
  margin-left: -290px;
  gap: 5px;
  top: 100%;
  justify-content: center;
  @media (max-width: ${breakpoints.mobile}) {
    z-index: 2;
    margin-left: -190px;
  }
`;

const CoinSearchPopupHeader = styled.h1`
  font-size: 25px;
`;

const DropDown = styled.div<ThemeProp>`
  width: 200px;
  padding: 10px;
  border-radius: 6px;
  background: ${(props) => (props.$light ? "#8D8DB1" : "#191925")};
  position: absolute;
  top: 100%;
  transform: translateY(90px) translateX(-290px);
  @media (max-width: ${breakpoints.mobile}) {
    z-index: 2;
    transform: translateY(90px) translateX(-190px);
  }
`;

const LoadingText = styled.p`
  font-size: 35px;
  text-align: center;
`;

type ThemeProp = {
  $light?: boolean;
};

export default function Converter() {
  const [buyCoin, setBuyCoin] = useState<Coin | null>(null);
  const [sellCoin, setSellCoin] = useState<Coin | null>(null);
  const [buySearch, setBuySearch] = useState("");
  const [sellSearch, setSellSearch] = useState("");
  const [timeFrameSelected, setTimeFrameSelected] = useState("1Y");
  const [dayCount, setDayCount] = useState("365");
  const [buyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
  const [sellQuantity, setSellQuantity] = useState<number | string>("");
  const [buyQuantity, setBuyQuantity] = useState<number | string>("");
  const [searchBuyPopupOpen, setSearchBuyPopupOpen] = useState(false);
  const [searchSellPopupOpen, setSearchSellPopupOpen] = useState(false);

  const { coins, setSelectedMobileBtn, setSelectedBtn, theme } =
    useCryptoContext();

  const size = useWindowSize();

  useEffect(() => {
    setSelectedMobileBtn("Converter");
    setSelectedBtn("Converter");
  }, []);

  useEffect(() => {
    if (coins.length > 0) {
      setSellCoin(coins[0]);
      setBuyCoin(coins[1]);
    }
  }, [coins]);

  useEffect(() => {
    if (sellCoin && buyCoin) {
      const sellCoinPrice = sellCoin.current_price;
      const sellCoinValue = sellCoinPrice * Number(sellQuantity);
      const buyCoinPrice = buyCoin.current_price;
      const result = sellCoinValue / buyCoinPrice;
      setBuyQuantity(parseFloat(result.toFixed(2)));
    }
  }, [sellCoin, buyCoin]);

  const date = new Date();
  const currentDate = date.toLocaleString();

  const handleBuySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBuySearch(value);
    if (value.length !== 0) {
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

  const filteredBuyCoins = coins
    .filter(
      (coin) =>
        coin.id.includes(buySearch) ||
        coin.symbol.includes(buySearch) ||
        coin.name.includes(buySearch)
    )
    .slice(0, 10);

  const filteredSellCoins = coins
    .filter(
      (coin) =>
        coin.id.includes(sellSearch) ||
        coin.symbol.includes(sellSearch) ||
        coin.name.includes(sellSearch)
    )
    .slice(0, 10);

  const handleSellQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setSellQuantity("");
      setBuyQuantity("");
      return;
    }
    setSellQuantity(Number(value));
    convertToSell(Number(value));
  };

  const handleBuyQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setBuyQuantity("");
      setSellQuantity("");
      return;
    }
    setBuyQuantity(Number(value));
    convertToBuy(Number(value));
  };

  const convertToSell = (number: number) => {
    if (buyCoin && sellCoin) {
      const sellCoinPrice = sellCoin.current_price;
      const sellCoinValue = sellCoinPrice * number;
      const buyCoinPrice = buyCoin.current_price;
      const result = sellCoinValue / buyCoinPrice;
      setBuyQuantity(parseFloat(result.toFixed(2)));
    }
  };

  const convertToBuy = (number: number) => {
    if (buyCoin && sellCoin) {
      const buyCoinPrice = buyCoin.current_price;
      const buyCoinValue = buyCoinPrice * number;
      const sellCoinPrice = sellCoin.current_price;
      const result = buyCoinValue / sellCoinPrice;
      setSellQuantity(parseFloat(result.toFixed(2)));
    }
  };

  const reverseConvert = () => {
    setBuyCoin(sellCoin);
    setSellCoin(buyCoin);
    setSellSearch(buySearch);
    setBuySearch(sellSearch);
    setBuyQuantity(sellQuantity);
    setSellQuantity(buyQuantity);
  };

  const toggleBuyPopup = () => {
    setSearchBuyPopupOpen(!searchBuyPopupOpen);
    if (!searchBuyPopupOpen) {
      setBuySearch("");
    }
    if (buyDropdownOpen) {
      setBuyDropdownOpen(false);
    }
  };

  const toggleSellPopup = () => {
    setSearchSellPopupOpen(!searchSellPopupOpen);
    if (!searchSellPopupOpen) {
      setSellSearch("");
    }
    if (sellDropdownOpen) {
      setSellDropdownOpen(false);
    }
  };

  const handleSetSellCoin = (coin: Coin) => {
    setSellCoin(coin);
    setSearchBuyPopupOpen(false);
    setSearchSellPopupOpen(false);
    setBuyDropdownOpen(false);
    setSellDropdownOpen(false);
    setSellSearch("");
  };

  const handleSetBuyCoin = (coin: Coin) => {
    setBuyCoin(coin);
    setSearchSellPopupOpen(false);
    setSearchBuyPopupOpen(false);
    setBuyDropdownOpen(false);
    setSellDropdownOpen(false);
    setBuySearch("");
  };

  if (coins.length < 1) {
    return <LoadingText>Loading coin database</LoadingText>;
  }

  return (
    <>
      {sellCoin && buyCoin && (
        <>
          <Title>Cryptocurrency Converter</Title>
          <DateText $light={theme === "light"}>{currentDate}</DateText>
          <ConverterContainer>
            <ConverterBox $light={theme === "light"}>
              <InnerContainer>
                <BuySellText>You Sell</BuySellText>
                <SearchAndValueContainer>
                  <CoinContainer>
                    <CoinLogo src={sellCoin.image} />
                    {size.width > parseInt(breakpoints.mobile) && (
                      <CoinText>{sellCoin.name}</CoinText>
                    )}
                    <CoinText>({sellCoin.symbol.toUpperCase()})</CoinText>
                    <ArrowText onClick={toggleSellPopup}>▼</ArrowText>
                  </CoinContainer>
                  <DropdownAndPopupContainer>
                    {searchSellPopupOpen && (
                      <CoinSearchPopup $light={theme === "light"}>
                        <CoinSearchPopupHeader>
                          Search Coin
                        </CoinSearchPopupHeader>
                        <SearchInput
                          value={sellSearch}
                          onChange={(e) => handleSellSearch(e)}
                          placeholder="Search Coin..."
                          autoFocus
                          $light={theme === "light"}
                        />
                      </CoinSearchPopup>
                    )}
                    {sellDropdownOpen && (
                      <DropDown $light={theme === "light"}>
                        {filteredSellCoins.map((coin) => (
                          <CoinOption
                            key={coin.id}
                            onClick={() => handleSetSellCoin(coin)}
                          >
                            {coin.name}
                          </CoinOption>
                        ))}
                      </DropDown>
                    )}
                  </DropdownAndPopupContainer>
                  <SellAmountInput
                    placeholder="Add Quanitity..."
                    value={sellQuantity}
                    onChange={(e) => handleSellQuantity(e)}
                    type="number"
                    $light={theme === "light"}
                  />
                </SearchAndValueContainer>
                <HorizontalLine />
                {sellCoin !== null ? (
                  <CurrencyAndPriceText>
                    1 {sellCoin.symbol.toUpperCase()} = $
                    {sellCoin.current_price}
                  </CurrencyAndPriceText>
                ) : (
                  <CurrencyAndPriceText>0</CurrencyAndPriceText>
                )}
              </InnerContainer>
            </ConverterBox>
            <ReverseConvertBtn
              $light={theme === "light"}
              onClick={() => reverseConvert()}
            >
              <p>↑↓</p>
            </ReverseConvertBtn>
            <ConverterBox $light={theme === "light"}>
              <InnerContainer>
                <BuySellText>You Buy</BuySellText>
                <SearchAndValueContainer>
                  <CoinContainer>
                    <CoinLogo src={buyCoin.image} />
                    {size.width > parseInt(breakpoints.mobile) && (
                      <CoinText>{buyCoin.name}</CoinText>
                    )}
                    <CoinText>({buyCoin.symbol.toUpperCase()})</CoinText>
                    <ArrowText onClick={toggleBuyPopup}>▼</ArrowText>
                  </CoinContainer>
                  <DropdownAndPopupContainer>
                    {searchBuyPopupOpen && (
                      <CoinSearchPopup $light={theme === "light"}>
                        <CoinSearchPopupHeader>
                          Search Coin
                        </CoinSearchPopupHeader>
                        <SearchInput
                          value={buySearch}
                          onChange={(e) => handleBuySearch(e)}
                          placeholder="Search Coin..."
                          autoFocus
                          $light={theme === "light"}
                        />
                      </CoinSearchPopup>
                    )}
                    {buyDropdownOpen && (
                      <DropDown $light={theme === "light"}>
                        {filteredBuyCoins.map((coin) => (
                          <CoinOption
                            key={coin.id}
                            onClick={() => handleSetBuyCoin(coin)}
                          >
                            {coin.name}
                          </CoinOption>
                        ))}
                      </DropDown>
                    )}
                  </DropdownAndPopupContainer>
                  <BuyAmountInput
                    placeholder="Add Quanitity..."
                    value={buyQuantity}
                    onChange={(e) => handleBuyQuantity(e)}
                    type="number"
                    $light={theme === "light"}
                  />
                </SearchAndValueContainer>
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
      )}
      <MobileButtons />
    </>
  );
}
