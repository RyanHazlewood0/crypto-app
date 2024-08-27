"use client";
import CoinsAndConverterBtns from "../components/CoinsAndConverterBtns/CoinsAndConverterBtns";
import ConverterChart from "./ConverterChart/ConverterChart";
import ConverterTimeSelect from "./ConverterTimeSelect/ConverterTimeSelect";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useCoin } from "../contexts/CoinProvider";
import { CoinTypes } from "types";

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
  position: relative;
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
  width: 100%;
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
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translate(-24px, -24px);
  top: 50%;
  z-index: 1;
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

const DropdownAndPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const CoinSearchPopup = styled.div`
  width: 200px;
  background: #191925;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  height: 90px;
  position: absolute;
  margin-left: -100px;
  gap: 5px;
  top: 100%;
`;

const CoinSearchPopupHeader = styled.h1`
  font-size: 25px;
`;

const DropDown = styled.div`
  width: 200px;
  background: #191925;
  padding: 10px;
  border-radius: 6px;
  background: ##191925;
  position: absolute;
  top: 100%;
  transform: translateY(90px) translateX(-100px);
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
  const [sellQuantity, setSellQuantity] = useState<number | string>("");
  const [buyQuantity, setBuyQuantity] = useState<number | string>("");
  const [hasError, setHasError] = useState(false);
  const [searchBuyPopupOpen, setSearchBuyPopupOpen] = useState(false);
  const [searchSellPopupOpen, setSearchSellPopupOpen] = useState(false);

  const { coins, setCoins, fiatCurrency } = useCoin();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setHasError(false);
    const fetchCoinData = async () => {
      try {
        const response: Response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData: CoinTypes[] = await response.json();
        setCoins(fetchedData);
      } catch {
        setHasError(true);
      }
    };
    fetchCoinData();
  }, [fiatCurrency]);

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
      setBuyQuantity(parseFloat(result.toFixed(3)));
    }
  }, [sellCoin, buyCoin]);

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
      setBuyQuantity(parseFloat(result.toFixed(3)));
    }
  };

  const convertToBuy = (number: number) => {
    if (buyCoin && sellCoin) {
      const buyCoinPrice = buyCoin.current_price;
      const buyCoinValue = buyCoinPrice * number;
      const sellCoinPrice = sellCoin.current_price;
      const result = buyCoinValue / sellCoinPrice;
      setSellQuantity(parseFloat(result.toFixed(3)));
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
    if (searchBuyPopupOpen === false) {
      setBuySearch("");
    }
    if (buyDropdownOpen) {
      setBuyDropdownOpen(false);
    }
  };

  const toggleSellPopup = () => {
    setSearchSellPopupOpen(!searchSellPopupOpen);
    if (searchSellPopupOpen === false) {
      setSellSearch("");
    }
    if (sellDropdownOpen) {
      setSellDropdownOpen(false);
    }
  };

  const handleSetSellCoin = (coin: CoinTypes) => {
    setSellCoin(coin);
    setSearchBuyPopupOpen(false);
    setSearchSellPopupOpen(false);
    setBuyDropdownOpen(false);
    setSellDropdownOpen(false);
    setSellSearch("");
  };

  const handleSetBuyCoin = (coin: CoinTypes) => {
    setBuyCoin(coin);
    setSearchSellPopupOpen(false);
    setSearchBuyPopupOpen(false);
    setBuyDropdownOpen(false);
    setSellDropdownOpen(false);
    setBuySearch("");
  };

  if (hasError) {
    return <p>Error fetching data...</p>;
  }

  return (
    <>
      {sellCoin && (
        <>
          <CoinsAndConverterBtns />
          <Title>Cryptocurrency Converter</Title>
          <DateText>{currentDate}</DateText>
          <ConverterContainer>
            <ConverterBox sell>
              <InnerContainer>
                <BuySellText>You Sell</BuySellText>
                <SearchAndValueContainer>
                  <CoinContainer>
                    <CoinLogo src={sellCoin.image} />
                    <CoinText>{sellCoin.name}</CoinText>
                    <CoinText>({sellCoin.symbol.toUpperCase()})</CoinText>
                    <ArrowText onClick={toggleSellPopup}>▼</ArrowText>
                  </CoinContainer>
                  <DropdownAndPopupContainer>
                    {searchSellPopupOpen && (
                      <CoinSearchPopup>
                        <CoinSearchPopupHeader>
                          Search Coin
                        </CoinSearchPopupHeader>
                        <SearchInput
                          value={sellSearch}
                          onChange={(e) => handleSellSearch(e)}
                          placeholder="Search Coin..."
                          autoFocus
                        />
                      </CoinSearchPopup>
                    )}
                    {sellDropdownOpen && (
                      <DropDown>
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
            <ReverseConvertBtn onClick={() => reverseConvert()}>
              <p>↑↓</p>
            </ReverseConvertBtn>
            <ConverterBox>
              <InnerContainer>
                <BuySellText>You Buy</BuySellText>
                <SearchAndValueContainer>
                  <CoinContainer>
                    <CoinLogo src={buyCoin.image} />
                    <CoinText>{buyCoin.name}</CoinText>
                    <CoinText>({buyCoin.symbol.toUpperCase()})</CoinText>
                    <ArrowText onClick={toggleBuyPopup}>▼</ArrowText>
                  </CoinContainer>
                  <DropdownAndPopupContainer>
                    {searchBuyPopupOpen && (
                      <CoinSearchPopup>
                        <CoinSearchPopupHeader>
                          Search Coin
                        </CoinSearchPopupHeader>
                        <SearchInput
                          value={buySearch}
                          onChange={(e) => handleBuySearch(e)}
                          placeholder="Search Coin..."
                          autoFocus
                        />
                      </CoinSearchPopup>
                    )}
                    {buyDropdownOpen && (
                      <DropDown>
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
    </>
  );
}
