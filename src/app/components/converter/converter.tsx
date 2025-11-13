"use client";
import ConverterChart from "./ConverterChart/ConverterChart";
import ConverterTimeSelect from "./ConverterTimeSelect/ConverterTimeSelect";
import { useState, useEffect } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { Coin } from "types";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import MobileButtons from "../MobileButtons/MobileButtons";

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
    return <p className={"text[35px] text-center"}>Loading coin database</p>;
  }

  return (
    <>
      {sellCoin && buyCoin && (
        <>
          <h1 className={"text-xl mb-4"}>Cryptocurrency Converter</h1>
          <p
            className={` mb-4 ${
              theme === "light" ? "color-white" : "color-[#9e9e9e]"
            }`}
          >
            {currentDate}
          </p>
          <div
            className={
              "w-full flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-10 justify-between"
            }
          >
            <div
              className={`w-full h-[200px] rounded-lg flex items-center md:w-[47.5%] ${
                theme === "light" ? "bg-white" : "bg-[#191932]"
              }`}
            >
              <div
                className={"w-full h-full flex flex-col justify-between p-5"}
              >
                <p className={"text[14px] text-[#9e9e9e] mb-[15px]"}>
                  You Sell
                </p>
                <div className={"w-full flex justify-between"}>
                  <div className={"flex max-w-[350px] items-center gap-[5px]"}>
                    <img className={"w-[24px] h-[24px]"} src={sellCoin.image} />
                    {size.width > parseInt(breakpoints.mobile) && (
                      <p className={"text-[20px]"}>{sellCoin.name}</p>
                    )}
                    <p className={"text-[20px]"}>
                      ({sellCoin.symbol.toUpperCase()})
                    </p>
                    <p
                      className={"text[20px] hover:cursor-pointer"}
                      onClick={toggleSellPopup}
                    >
                      ▼
                    </p>
                  </div>
                  <div className={"flex flex-col justify-center relative"}>
                    {searchSellPopupOpen && (
                      <div
                        className={`rounded-[6px] w-[200px] ${
                          theme === "light" ? "bg-[#8D8DB1]" : "bg-[#191925]"
                        } 
                      flex z-10 flex-col items-center p-[15px] h-[90px] absolute right-full gap-[5px] top-full justify-center`}
                      >
                        <h2 className={"text-[25px]"}>Search Coin</h2>
                        <input
                          value={sellSearch}
                          onChange={(e) => handleSellSearch(e)}
                          placeholder="Search Coin..."
                          autoFocus
                          className={`w-full border border-gray-500 rounded-[6px] ${
                            theme === "light" ? "bg-[#8D8DB1]" : "bg-[#191932]"
                          }`}
                        />
                      </div>
                    )}
                    {sellDropdownOpen && (
                      <div
                        className={`
  w-[200px] 
  p-[10px] 
  rounded-[6px] 
  ${theme === "light" ? "bg-[#8D8DB1]" : "bg-[#191925]"} 
  absolute 
  top-full 
  transform 
  z-[2] 
  translate-x-[-200px] translate-y-[90px]
`}
                      >
                        {filteredSellCoins.map((coin) => (
                          <p
                            key={coin.id}
                            onClick={() => handleSetSellCoin(coin)}
                            className={"hover:cursor-pointer"}
                          >
                            {coin.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    placeholder="Add Quanitity..."
                    value={sellQuantity}
                    onChange={(e) => handleSellQuantity(e)}
                    type="number"
                    className={`w-[30%] border border-gray-500 rounded-[6px] ${
                      theme === "light" ? "bg-white" : "bg-[#191932]"
                    } `}
                  />
                </div>
                <hr className={"bg-white w-full mt-[15px]"} />
                {sellCoin !== null ? (
                  <p className={"text-[14px]"}>
                    1 {sellCoin.symbol.toUpperCase()} = $
                    {sellCoin.current_price}
                  </p>
                ) : (
                  <p className={"text-[14px]"}>0</p>
                )}
              </div>
            </div>
            <div
              onClick={() => reverseConvert()}
              className={`rounded-[50px] w-[48px] h-[48px] flex items-center justify-center cursor-pointer z-1 absolute left-[50%] top-[50%]
                transform -translate-x-[24px] -translate-y-[24px] ${
                  theme === "light"
                    ? "bg-[#6161D6] text-white"
                    : "bg-white text-black"
                }`}
            >
              <p>↑↓</p>
            </div>
            <div
              className={`w-full h-[200px] rounded-lg flex items-center md:w-[47.5%] ${
                theme === "light" ? "bg-white" : "bg-[#191932]"
              }`}
            >
              <div
                className={"w-full h-full flex flex-col justify-between p-5"}
              >
                <p className={"text[14px] text-[#9e9e9e] mb-[15px]"}>You Buy</p>
                <div className={"w-full flex justify-between"}>
                  <div className={"flex max-w-[350px] items-center gap-[5px]"}>
                    <img className={"w-[24px] h-[24px]"} src={buyCoin.image} />
                    {size.width > parseInt(breakpoints.mobile) && (
                      <p className={"text-[20px]"}>{buyCoin.name}</p>
                    )}
                    <p className={"text-[20px]"}>
                      ({buyCoin.symbol.toUpperCase()})
                    </p>
                    <p
                      className={"text[20px] hover:cursor-pointer"}
                      onClick={toggleBuyPopup}
                    >
                      ▼
                    </p>
                  </div>
                  <div className={"flex flex-col justify-center relative"}>
                    {searchBuyPopupOpen && (
                      <div
                        className={`rounded-[6px] w-[200px] ${
                          theme === "light" ? "bg-[#8D8DB1]" : "bg-[#191925]"
                        } 
                      flex z-10 flex-col items-center p-[15px] h-[90px] absolute right-full gap-[5px] top-full justify-center`}
                      >
                        <h2 className={"text-[25px]"}>Search Coin</h2>
                        <input
                          value={buySearch}
                          onChange={(e) => handleBuySearch(e)}
                          placeholder="Search Coin..."
                          autoFocus
                          className={`w-full border border-gray-500 rounded-[6px] ${
                            theme === "light" ? "bg-[#8D8DB1]" : "bg-[#191932]"
                          }`}
                        />
                      </div>
                    )}
                    {buyDropdownOpen && (
                      <div
                        className={`
  w-[200px] 
  p-[10px] 
  rounded-[6px] 
  ${theme === "light" ? "bg-[#8D8DB1]" : "bg-[#191925]"} 
  absolute 
  top-full 
  transform 
  z-[2] 
  translate-x-[-200px] translate-y-[90px]
`}
                      >
                        {filteredBuyCoins.map((coin) => (
                          <p
                            key={coin.id}
                            onClick={() => handleSetBuyCoin(coin)}
                            className={"hover:cursor-pointer"}
                          >
                            {coin.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    placeholder="Add Quanitity..."
                    value={buyQuantity}
                    onChange={(e) => handleBuyQuantity(e)}
                    type="number"
                    className={`w-[30%] border border-gray-500 rounded-[6px] ${
                      theme === "light" ? "bg-white" : "bg-[#191932]"
                    }`}
                  />
                </div>
                <hr className={"bg-white w-full mt-[15px]"} />
                {buyCoin !== null ? (
                  <p className={"text-[14px]"}>
                    1 {buyCoin.symbol.toUpperCase()} = ${buyCoin.current_price}
                  </p>
                ) : (
                  <p className={"text-[14px]"}>0</p>
                )}
              </div>
            </div>
          </div>
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
