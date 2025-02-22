import { useEffect, useState } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { PortfolioCoin } from "types";
import { Dispatch, SetStateAction } from "react";
import EditIcon from "../svg/edit-2";
import {
  abbreviateNumber,
  findSupplyLevel,
  findVolumeLevel,
} from "helper-functions";
import RedArrow from "../svg/RedArrow";
import GreenArrow from "../svg/GreenArrow";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

type CoinEntryProps = {
  coin: PortfolioCoin;
  portfolioCoins: PortfolioCoin[];
  setPortfolioCoins: Dispatch<SetStateAction<[] | PortfolioCoin[]>>;
  editCoinEntry: (
    e: React.MouseEvent<HTMLButtonElement>,
    coin: PortfolioCoin
  ) => void;
  isEditOpen: any;
};

type FetchedDataType = {
  prices: [number, number][];
};
export type CoinPriceDataTypes = {
  price: number;
  date: string;
};

const CoinEntry = ({
  coin,
  setPortfolioCoins,
  portfolioCoins,
  editCoinEntry,
  isEditOpen,
}: CoinEntryProps) => {
  const [error, setError] = useState(false);
  const { fiatCurrency, theme } = useCryptoContext();
  const [priceData, setPriceData] = useState<CoinPriceDataTypes[] | null>(null);
  const [purchasePrice, setPurchasePrice] = useState<number | null>(null);
  const [currentP, setCurrentP] = useState(coin.currentPrice);
  const [totalVal, setTotalVal] = useState(coin.totalValue);
  const [change24, setChange24] = useState();
  const [changeSincePurchase, setChangeSincePurchase] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const size = useWindowSize();

  useEffect(() => {
    setError(false);
    if (coin) {
      const fetchPriceData = async () => {
        try {
          const response: Response = await fetch(
            `https://pro-api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${fiatCurrency}&days=2000&interval=daily&x_cg_pro_api_key=${apiKey}`
          );
          const fetchedData: FetchedDataType = await response.json();
          setPriceData(
            fetchedData.prices.map((el) => {
              const thisDate = new Date(el[0]);
              const thisPrice = el[1];
              return {
                price: thisPrice,
                date: thisDate.toISOString(),
              };
            })
          );
        } catch {
          setError(true);
        }
      };
      fetchPriceData();
    }
  }, [fiatCurrency, isEditOpen]);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      if (coin) {
        try {
          const response = await fetch(
            `https://pro-api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false&x_cg_pro_api_key=${apiKey}`
          );
          const data = await response.json();
          if (fiatCurrency === "usd") {
            setCurrentP(data.market_data.current_price.usd);
            setTotalVal(data.market_data.current_price.usd * coin.totalAmount);
            setChange24(
              data.market_data.price_change_percentage_24h_in_currency.usd
            );
          } else if (fiatCurrency === "nzd") {
            setCurrentP(data.market_data.current_price.nzd);
            setTotalVal(data.market_data.current_price.nzd * coin.totalAmount);
            setChange24(
              data.market_data.price_change_percentage_24h_in_currency.nzd
            );
          } else if (fiatCurrency === "gbp") {
            setCurrentP(data.market_data.current_price.gbp);
            setTotalVal(data.market_data.current_price.gbp * coin.totalAmount);
            setChange24(
              data.market_data.price_change_percentage_24h_in_currency.gbp
            );
          } else if (fiatCurrency === "aud") {
            setCurrentP(data.market_data.current_price.aud);
            setTotalVal(data.market_data.current_price.aud * coin.totalAmount);
            setChange24(
              data.market_data.price_change_percentage_24h_in_currency.aud
            );
          }
          if (priceData) {
            const thisPriceData = priceData.find(
              (el) => el.date === coin.purchaseDate.toISOString()
            );
            if (thisPriceData) {
              setPurchasePrice(thisPriceData.price);
            }
          }
        } catch {
          setError(true);
        }
      }
    };
    fetchData();
  }, [fiatCurrency, priceData]);

  useEffect(() => {
    if (purchasePrice && currentP) {
      const biggerNum = Math.max(purchasePrice, currentP);
      const smallerNum = Math.min(purchasePrice, currentP);
      const difference = biggerNum - smallerNum;
      const average = (biggerNum + smallerNum) / 2;
      const diffByAvg = difference / average;
      const percentDiff = diffByAvg * 100;
      setChangeSincePurchase(percentDiff);
    }
  }, [purchasePrice, currentP]);

  const deleteEntry = (thisCoin: PortfolioCoin) => {
    const filteredPortfolio = portfolioCoins.filter(
      (coin) => coin.name !== thisCoin.name
    );
    setPortfolioCoins(filteredPortfolio);
  };

  if (error) {
    return <p>error fetching portfolio entry data</p>;
  }

  if (coin) {
    if (size.width < parseInt(breakpoints.mobile)) {
      return (
        <div
          className={`${
            theme === "light" ? "bg-[white]" : "bg-[#191932]"
          } w-[100%] h-[315px] flex flex-col p-4 justify-between`}
        >
          <div className="flex">
            <div className="flex justify-start w-[50%] gap-[20px]">
              <div className="flex flex-col">
                <div className="text-[16px]">{coin.name}</div>
                <div className="text-[12px]">
                  {coin.purchaseDate.toISOString().split("T")[0]}
                </div>
              </div>
              <img className="w-[43px]" src={coin.image} />
            </div>
            <div className="flex justify-end w-[50%] gap-[20px]">
              <button
                className={`${
                  theme === "light" ? "bg-[#B0B0EB]" : "bg-[#3a3978]"
                } p-2.5 rounded h-[40px] w-[40px] text-white`}
                onClick={(e) => editCoinEntry(e, coin)}
              >
                <EditIcon />
              </button>
              <button
                className={`${
                  theme === "light" ? "bg-[#B0B0EB]" : "bg-[#3a3978]"
                } p-2.5 rounded h-[40px] w-[40px] text-white`}
                onClick={() => deleteEntry(coin)}
              >
                X
              </button>
            </div>
          </div>
          <div className="text-[20px]">
            <p className="text-[14px]">Total Value</p>$
            {abbreviateNumber(totalVal)}
          </div>
          <div className="flex justify-between">
            <div
              className="flex flex-col w-[155.5px] rounded-2 align-middle p-[10px] border justify-center rounded-[10px]"
              style={{ borderColor: "#e8e8e8" }}
            >
              <p className="text-[16px] text-center">
                ${abbreviateNumber(currentP)}
              </p>
              <p className="text-[12px] text-center">Current Price</p>
            </div>
            <div
              className="flex flex-col w-[155.5px] rounded-2 align-middle p-[10px] border justify-center rounded-[10px]"
              style={{ borderColor: "#e8e8e8" }}
            >
              <p
                className={`${
                  coin.priceChange24h > 0 ? "text-[#01F1E3]" : "text-[#FE2264]"
                } text-[16px] flex items-center justify-center text-center`}
              >
                {coin.priceChange24h > 0 ? <GreenArrow /> : <RedArrow />}
                {abbreviateNumber(change24)}%
              </p>
              <p className="text-[12px] text-center">24h%</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div
              className="flex flex-col w-[155.5px] rounded-2 align-middle p-[10px] border justify-center rounded-[10px]"
              style={{ borderColor: "#e8e8e8" }}
            >
              <p
                className={`${
                  coin.priceChange24h > 0 ? "text-[#01F1E3]" : "text-[#FE2264]"
                } text-[16px] flex items-center justify-center text-center`}
              >
                {coin.priceChange24h > 0 ? <GreenArrow /> : <RedArrow />}
                {abbreviateNumber(changeSincePurchase)}%
              </p>
              <p className="text-[12px] text-center">% Since Purchase</p>
            </div>
            <div
              className="flex flex-col w-[155.5px] rounded-2 align-middle p-[10px] border justify-center rounded-[10px]"
              style={{ borderColor: "#e8e8e8" }}
            >
              <p className="text-[16px] text-center">{coin.totalAmount}</p>
              <p className="text-[12px] text-center">Coin Amount</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex w-full h-[292px]">
          <div
            className={`${
              theme === "light" ? "bg-white" : "bg-[#1e1932]"
            } flex flex-col w-[258px] h-full justify-center items-center`}
          >
            <img className="w-[64px]" src={coin.image} />
            <p className="text-[28px] text-center font-bold">
              {coin.name} ({coin.symbol.toUpperCase()})
            </p>
          </div>
          <div
            className={`${theme === "light" ? "bg-white" : "bg-[#191932]"}
            flex flex-col w-[1038px] h-[100%] justify-around p-5`}
          >
            <div className="flex flex-col justify-between text-center gap-2.5">
              <div className="flex justify-between">
                <p className="text-[20px]">Market Price</p>
                <button
                  className={`${
                    theme === "light" ? "bg-#B0B0EB" : "bg-#3a3978"
                  } p-2.5 rounded h-[40px] w-[40px] text-white`}
                  onClick={() => deleteEntry(coin)}
                >
                  X
                </button>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-[14px]">Current Price</p>
                  <p className="text-[16px]">${abbreviateNumber(currentP)}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px]">Price Change 24h</p>
                  <p
                    className={`${
                      coin.priceChange24h > 0
                        ? "text-[#01F1E3]"
                        : "text-[#FE2264]"
                    } text-[16px] flex items-center justify-center`}
                  >
                    {coin.priceChange24h > 0 ? <GreenArrow /> : <RedArrow />}
                    {abbreviateNumber(change24)}%
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px]">24h Vol Vs M-Cap</p>
                  <div className="flex align-middle justify-between">
                    <p className="text-[16px]">
                      <div>{abbreviateNumber(findVolumeLevel(coin))}%</div>
                    </p>
                    <div className="flex h-[5px] bg-[#40916c] rounded-[5px] w-[55px]">
                      <div
                        style={{ width: `${findVolumeLevel(coin)}%` }}
                        className="bg-[#01f1e3] h-[5px] rounded[5px]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px]">Circ vs Total Supply</p>
                  <div className="flex align-middle justify-between">
                    <p className="text-[16px]">
                      <div>{abbreviateNumber(findSupplyLevel(coin))}%</div>
                    </p>
                    <div className="flex h-[5px] bg-[#40916c] rounded-[5px] w-[55px]">
                      <div style={{ width: `${findSupplyLevel(coin)}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="w-[100%]" />
            <div className="flex flex-col justify-between text-center gap-2.5">
              <div className="flex justify-between">
                <p className="text-[20px]">Your Coin</p>
                <button
                  className={`${
                    theme === "light" ? "bg-#B0B0EB" : "bg-#3a3978"
                  } p-2.5 rounded h-[40px] w-[40px] text-white`}
                  onClick={(e) => editCoinEntry(e, coin)}
                >
                  <EditIcon />
                </button>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-[14px]">Current Amount</p>
                  <p className="text-[16px]">{coin.totalAmount}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px]">Amount Value</p>
                  <p className="text-[16px]">${abbreviateNumber(totalVal)}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px]">Price Change Since Purchase</p>
                  <p
                    className={`${
                      currentP > purchasePrice
                        ? "text-[#01F1E3]"
                        : "text-[#FE2264]"
                    } text-[16px] flex items-center justify-center`}
                  >
                    {currentP > purchasePrice ? <GreenArrow /> : <RedArrow />}
                    {currentP < purchasePrice && "- "}
                    {abbreviateNumber(changeSincePurchase)}%
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px]">Purchase Date</p>
                  <p className="text-[16px]">
                    {coin.purchaseDate.toISOString().split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default CoinEntry;
