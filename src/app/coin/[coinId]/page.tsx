"use client";
import Link from "next/link";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { useState, useEffect } from "react";
import { abbreviateNumber } from "helper-functions";
import CopyIcon from "./svg/CopyIcon";
import RoundIcon from "./svg/RoundIcon";
import RedArrow from "./svg/RedArrow";
import GreenArrow from "./svg/GreenArrow";
import Star from "./svg/Star";
import { CoinPageObject } from "types";

type CoinProps = {
  params: { coinId: string };
};

export default function Coin({ params }: CoinProps) {
  const [hasError, setHasError] = useState(false);
  const [thisCoinData, setThisCoinData] = useState<CoinPageObject | null>(null);
  const [copyClicked, setCopyClicked] = useState(false);
  const [starClicked, setStarClicked] = useState(false);

  const {
    fiatCurrency,
    theme,
    setSelectedNavLink,
    watchListCoins,
    setWatchListCoins,
  } = useCryptoContext();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setSelectedNavLink("Coin");
    const fetchData = async () => {
      setHasError(false);
      try {
        const response: Response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData: CoinPageObject = await response.json();
        setThisCoinData(fetchedData);
      } catch {
        setHasError(true);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };

  const handleCopyTrue = () => {
    navigator.clipboard.writeText(thisCoinData.links.homepage[0]);
    setCopyClicked(true);
    setTimeout(() => setCopyClicked(false), 2000);
  };

  const handleStarModal = () => {
    setStarClicked(true);
    setTimeout(() => setStarClicked(false), 2000);
  };

  const handleStarClick = () => {
    if (watchListCoins.some((coin) => coin.name === thisCoinData.name)) {
      const updatedList = watchListCoins.filter(
        (coin) => coin.name !== thisCoinData.name
      );
      const myJSON = JSON.stringify([...updatedList]);
      localStorage.setItem("testJSON", myJSON);
      setWatchListCoins([...updatedList]);
    } else {
      const watchListCoin = {
        name: thisCoinData.name,
        currentPrice: thisCoinData.market_data.current_price.usd,
        image: thisCoinData.image.small,
        symbol: thisCoinData.symbol,
        id: thisCoinData.id,
      };
      const myJSON = JSON.stringify([...watchListCoins, watchListCoin]);
      localStorage.setItem("testJSON", myJSON);
      setWatchListCoins([...watchListCoins, watchListCoin]);
    }
    handleStarModal();
  };

  if (hasError) {
    return <p>Error loading data</p>;
  }

  return (
    <>
      <div className={"w-full flex flex-col justify-center gap-[15px] pb-5"}>
        {thisCoinData !== null && (
          <>
            <div className={"flex mb-2.5"}>
              <Link href="/">
                <div className={"text-[20px] mr-[15px]"}>←</div>
              </Link>
              <h1 className={"text-[20px]"}>{thisCoinData.name}</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <div
                className={`flex flex-col justify-center items-center w-full px-0 py-[10%] rounded-lg gap-5 ${
                  theme === "light" ? "bg-white" : "bg-[#1e1932]"
                } `}
              >
                <img src={thisCoinData.image.small} />
                <h1 style={{ fontSize: "28px" }}>
                  {thisCoinData.name} ({thisCoinData.symbol})
                </h1>
                <div
                  className="ml-auto mr-auto cursor-pointer"
                  onClick={handleStarClick}
                >
                  <Star
                    watchListCoins={watchListCoins}
                    thisCoinData={thisCoinData}
                  />
                </div>
              </div>
              <div
                className={`w-full flex py-2.5 items-center justify-center rounded-lg px-2.5 md:hidden ${
                  theme === "light" ? "bg-white" : "bg-[#1e1932]"
                }`}
              >
                <a
                  href={thisCoinData.links.homepage[0]}
                  style={{ marginRight: "10px" }}
                  className={"truncate"}
                >
                  {thisCoinData.links.homepage[0]}
                </a>
                <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                  <CopyIcon />
                </div>
                {copyClicked === true && (
                  <div
                    className={
                      "fixed top‑1/2 left‑1/2 transform ‑translate‑x‑1/2 ‑translate‑y‑1/2 bg‑black text‑white rounded‑[6px] p‑[10px]"
                    }
                  >
                    Link has been copied!
                  </div>
                )}
              </div>
              <div
                className={`w-full flex flex-col justify-center items-center rounded-[12px] gap-2.5 py-2.5 ${
                  theme === "light" ? "bg-white" : "bg-[#1e1932]"
                }`}
              >
                <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
                  $
                  {abbreviateNumber(
                    thisCoinData.market_data.current_price[fiatCurrency]
                  )}
                </h1>
                <div>
                  <div className={"flex flex-col w-full gap-[20px]"}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginBottom: "7px",
                      }}
                    >
                      <GreenArrow />
                      <p style={{ fontSize: "16px" }}>All time high:</p>
                      <p style={{ fontSize: "20px" }}>
                        $
                        {abbreviateNumber(
                          thisCoinData.market_data.ath[fiatCurrency]
                        )}
                      </p>{" "}
                    </div>
                    <p
                      className={`text-[14px] text-center ${
                        theme === "light" ? "text-[#353570]" : "text-[#b9b9ba]"
                      }`}
                    >
                      {formatDate(
                        thisCoinData.market_data.ath_date[fiatCurrency]
                      )}
                    </p>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        marginBottom: "7px",
                      }}
                    >
                      <RedArrow />
                      <p style={{ fontSize: "16px" }}>All time low:</p>
                      <p style={{ fontSize: "20px" }}>
                        $
                        {abbreviateNumber(
                          thisCoinData.market_data.atl[fiatCurrency]
                        )}
                      </p>{" "}
                    </div>
                    <p
                      className={`text-[14px] text-center ${
                        theme === "light" ? "text-[#353570]" : "text-[#b9b9ba]"
                      }`}
                    >
                      {formatDate(
                        thisCoinData.market_data.atl_date[fiatCurrency]
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={
                  "w-full hidden lg:flex flex-col justify-center items-center rounded-[12px]"
                }
              >
                <div
                  className={`flex w-full justify-between items-center py-[5px] px-[15px] flex-1 ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  } rounded-t-[12px]`}
                >
                  <div className={"flex gap-2.5 text-[16px]"}>
                    <RoundIcon />
                    <p>Market Cap</p>
                  </div>
                  <div className={"flex items-center py-2.5 px-0"}>
                    <div className={"text-[20px]"}>
                      $
                      {abbreviateNumber(
                        thisCoinData.market_data.market_cap[fiatCurrency]
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`flex w-full text-[14px] justify-between items-center py-[5px] px-[15px] flex-1 ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  }`}
                >
                  <div className={"flex gap-2.5 text-[16px]"}>
                    <RoundIcon />
                    <p>Fully Diluted Valuation</p>
                  </div>
                  <div className={"flex items-center py-2.5 px-0"}>
                    <p className={"text-[20px]"}>
                      $
                      {abbreviateNumber(
                        thisCoinData.market_data.fully_diluted_valuation[
                          fiatCurrency
                        ]
                      )}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex w-full text-[14px] justify-between items-center py-[5px] px-[15px] flex-1 ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  }`}
                >
                  <div className={"flex gap-2.5 text-[16px]"}>
                    <RoundIcon />
                    <p>Volume 24h</p>
                  </div>
                  <td className={"flex items-center py-2.5 px-0"}>
                    <p className={"text-[20px]"}>
                      $
                      {abbreviateNumber(
                        thisCoinData.market_data.total_volume[fiatCurrency]
                      )}
                    </p>
                  </td>
                </div>
                <div
                  className={`flex w-full text-[14px] justify-between items-center py-[5px] px-[15px] flex-1 ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  }`}
                >
                  <div className={"flex gap-2.5 text-[16px]"}>
                    <RoundIcon />
                    <p>Circulating Supply</p>
                  </div>
                  <div className={"flex items-center py-2.5 px-0"}>
                    <p className={"text-[20px]"}>
                      {abbreviateNumber(
                        thisCoinData.market_data.circulating_supply
                      )}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex w-full text-[14px] justify-between items-center py-[5px] px-[15px] rounded-b-[12px] flex-1 ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  }`}
                >
                  <div className={"flex gap-2.5 text-[16px]"}>
                    <RoundIcon />
                    <p>Total Supply</p>
                  </div>
                  <div className={"flex items-center py-2.5 px-0"}>
                    <p className={"text-[20px]"}>
                      {abbreviateNumber(thisCoinData.market_data.total_supply)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`hidden w-full md:flex py-2.5 items-center justify-center rounded-lg px-2.5 ${
                theme === "light" ? "bg-white" : "bg-[#1e1932]"
              }`}
            >
              <a
                href={thisCoinData.links.homepage[0]}
                style={{ marginRight: "10px" }}
                className={"truncate"}
              >
                {thisCoinData.links.homepage[0]}
              </a>
              <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                <CopyIcon />
              </div>
              {copyClicked === true && (
                <div
                  className={
                    "fixed top‑1/2 left‑1/2 transform ‑translate‑x‑1/2 ‑translate‑y‑1/2 bg‑black text‑white rounded‑[6px] p‑[10px]"
                  }
                >
                  Link has been copied!
                </div>
              )}
            </div>
            <div className={"w-full lg:hidden"}>
              <table className={"w-full"}>
                <tr
                  className={`flex w-full justify-between items-center py-[5px] px-[15px] ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  } rounded-t-[12px]`}
                >
                  <div className={"flex gap-2.5 text-[16px]"}>
                    <RoundIcon />
                    <p>Market Cap</p>
                  </div>
                  <td className={"flex items-center py-2.5 px-0"}>
                    <div className={"text-[20px]"}>
                      $
                      {abbreviateNumber(
                        thisCoinData.market_data.market_cap[fiatCurrency]
                      )}
                    </div>
                  </td>
                </tr>
                <tr
                  className={`flex w-full text-[14px] justify-between items-center py-[5px] px-[15px] ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  }`}
                >
                  <div className={"flex gap-2.5 text-[16px]"}>
                    <RoundIcon />
                    <p>Fully Diluted Valuation</p>
                  </div>
                  <td className={"flex items-center py-2.5 px-0"}>
                    <p className={"text-[20px]"}>
                      $
                      {abbreviateNumber(
                        thisCoinData.market_data.fully_diluted_valuation[
                          fiatCurrency
                        ]
                      )}
                    </p>
                  </td>
                </tr>
                <tr
                  className={`flex w-full text-[14px] justify-between items-center py-[5px] px-[15px] ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  }`}
                >
                  <div className={"flex gap-2.5 text-[16px]"}>
                    <RoundIcon />
                    <p>Volume 24h</p>
                  </div>
                  <td className={"flex items-center py-2.5 px-0"}>
                    <p className={"text-[20px]"}>
                      $
                      {abbreviateNumber(
                        thisCoinData.market_data.total_volume[fiatCurrency]
                      )}
                    </p>
                  </td>
                </tr>
                <tr
                  className={`flex w-full text-[14px] justify-between items-center py-[5px] px-[15px] ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  }`}
                >
                  <div className={"flex gap-2.5 text-[16px]"}>
                    <RoundIcon />
                    <p>Circulating Supply</p>
                  </div>
                  <td className={"flex items-center py-2.5 px-0"}>
                    <p className={"text-[20px]"}>
                      {abbreviateNumber(
                        thisCoinData.market_data.circulating_supply
                      )}
                    </p>
                  </td>
                </tr>
                <tr
                  className={`flex w-full text-[14px] justify-between items-center py-[5px] px-[15px] rounded-b-[12px] ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  }`}
                >
                  <div className={"flex gap-2.5 text-[16px]"}>
                    <RoundIcon />
                    <p>Total Supply</p>
                  </div>
                  <td className={"flex items-center py-2.5 px-0"}>
                    <p className={"text-[20px]"}>
                      {abbreviateNumber(thisCoinData.market_data.total_supply)}
                    </p>
                  </td>
                </tr>
              </table>
            </div>
            <div className="flex flex-col lg:flex-row gap-[15px]">
              <p className={"text-[24px] lg:hidden"}>Description</p>
              <p className={"text-14px"}>{thisCoinData.description.en}</p>
              <div className={"flex flex-col gap-5 mt-auto"}>
                <div
                  className={`w-full flex py-2.5 items-center justify-center rounded-lg px-2.5 ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  }`}
                >
                  <a
                    style={{ marginRight: "10px" }}
                    href={thisCoinData.links.blockchain_site[0]}
                    className={"truncate"}
                  >
                    {thisCoinData.links.blockchain_site[0]}
                  </a>
                  <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                    <CopyIcon />
                  </div>
                  {copyClicked === true && (
                    <div
                      className={
                        "fixed top‑1/2 left‑1/2 transform ‑translate‑x‑1/2 ‑translate‑y‑1/2 bg‑black text‑white rounded‑[6px] p‑[10px]"
                      }
                    >
                      Link has been copied!
                    </div>
                  )}
                </div>
                <div
                  className={`w-full flex py-2.5 items-center justify-center rounded-lg px-2.5 ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932] "
                  }`}
                >
                  <a
                    style={{ marginRight: "10px" }}
                    href={thisCoinData.links.blockchain_site[1]}
                    className={"truncate"}
                  >
                    {thisCoinData.links.blockchain_site[1]}
                  </a>
                  <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                    <CopyIcon />
                  </div>
                  {copyClicked === true && (
                    <div
                      className={
                        "fixed top‑1/2 left‑1/2 transform ‑translate‑x‑1/2 ‑translate‑y‑1/2 bg‑black text‑white rounded‑[6px] p‑[10px]"
                      }
                    >
                      Link has been copied!
                    </div>
                  )}
                </div>
                <div
                  className={`w-full flex py-2.5 items-center justify-center rounded-lg px-2.5 ${
                    theme === "light" ? "bg-white" : "bg-[#1e1932]"
                  }`}
                >
                  <a
                    style={{ marginRight: "10px" }}
                    href={thisCoinData.links.blockchain_site[2]}
                    className={"truncate"}
                  >
                    {thisCoinData.links.blockchain_site[2]}
                  </a>
                  <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                    <CopyIcon />
                  </div>
                  {copyClicked === true && (
                    <div
                      className={
                        "fixed top‑1/2 left‑1/2 transform ‑translate‑x‑1/2 ‑translate‑y‑1/2 bg‑black text‑white rounded‑[6px] p‑[10px]"
                      }
                    >
                      Link has been copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
