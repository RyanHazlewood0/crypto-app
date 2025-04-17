import { useState, useEffect } from "react";
import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 350px;
    align-items: center;
    padding: 0 10px 0 10px;
    margin-bottom: 20px;
  }
`;

const HeaderText = styled.h1`
  font-size: 24px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 350px;
    align-items: center;
  }
`;

const QuitBtn = styled.button<ThemeProp>`
  width: 24px;
  height: 24px;
  border: ${(props) => (props.$light ? "solid 1px black" : "solid 1px white")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinDisplay = styled.div<ThemeProp>`
  display: flex;
  padding: 8px;
  background: ${(props) => (props.$light ? "#ebebfd" : "#191925")};
  width: 170px;
  height: 44px;
  border-radius: 4px;
  justify-content: space-around;
  align-items: center;
  @media (max-width: ${breakpoints.mobile}) {
    width: 30%;
  }
`;

const CoinSelect = styled.input<ThemeProp>`
  background: ${(props) => (props.$light ? "#ebebfd" : "#191925")};
  width: 588px;
  height: 44px;
  border-radius: 4px;
  padding: 8px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 60%;
  }
`;

const SearchModal = styled.div`
  display: flex;
  flex-direction: column;
  background: #ebebfd;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 2;
  width: 588px;
  margin-top: 44px;
  margin-left: 202px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 198px;
    right: 10px;
  }
`;

const DatesContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mobile}) {
    width: 350px;
  }
`;
const DatesInnerContainer = styled.div`
  display: flex;
  width: 499px;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mobile}) {
    width: 350px;
    padding: 0 10px 0 10px;
  }
`;
const DateInput = styled.input<ThemeProp>`
  background: ${(props) => (props.$light ? "white" : "#191925")};
  width: 238px;
  padding: 8px 24px 8px 8px;
  border-radius: 8px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 150px;
  }
`;

const QuantitySymbol = styled.div<ThemeProp>`
  width: 83px;
  border-radius: 8px;
  padding: 8px;
  background: ${(props) => (props.$light ? "#ebebfd" : "#191925")};
  text-align: center;
`;

const InfoContainer = styled.div<ThemeProp>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.$light ? "#f3f5f9" : "#191925")};
  padding: 32px;
  margin-bottom: 32px;
  gap: 12px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 330px;
    padding: 10px;
    margin: 0 0 20px 10px;
    border-radius: 4px;
  }
`;

const InfoRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InfoText = styled.p`
  font-size: 16px;
`;

const NumText = styled.p`
  font-size: 20px;
`;

const Line = styled.hr`
  border-top: 1px solid #b0b0eb;
  width: 100%;
`;

const CalculateBtn = styled.button<ThemeProp>`
  width: 100%;
  background: ${(props) => (props.$light ? "#B0B0EB" : "#6161d6")};
  padding: 12px;
  font-size: 16px;
  color: white;
  border-radius: 6px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 330px;
    margin-left: 10px;
  }
`;

const CoinOption = styled.div`
  cursor: pointer;
  &:hover {
    background: #0077b6;
  }
`;

const CoinImage = styled.img`
  width: 28px;
  height: 28px;
`;

const CoinText = styled.p`
  font-size: 16px;
`;

const NumberInput = styled.input<ThemeProp>`
  width: 110px;
  background: ${(props) => (props.$light ? "#f3f5f9" : "#191925")};
  border: ${(props) =>
    props.$light ? "solid 1px #191925" : "solid 1px #f3f5f9"};
  border-radius: 4px;
  padding: 0 5px 0 5px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 60px;
  }
`;

type InvestmentCalcProps = {
  setCalcMocalOpen: Dispatch<SetStateAction<boolean>>;
};

type ThemeProp = {
  $light?: boolean;
};

const InvestmentCalc = ({ setCalcMocalOpen }: InvestmentCalcProps) => {
  const [error, setError] = useState(false);
  const [searchVal, setSearchVal] = useState<string>("");
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [intervalDays, setIntervalDays] = useState<number | null>(null);
  const [initialInvestment, setInitialInvestment] = useState<number | null>(
    null
  );
  const [periodicInvestment, setPeriodicInvestment] = useState<number | null>(
    null
  );
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [totalValue, setTotalValue] = useState(0);
  const [priceData, setPriceData] = useState([]);

  const { coins, fiatCurrency, theme } = useCryptoContext();

  const size = useWindowSize();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    if (selectedCoin && startDate && finishDate) {
      try {
        setError(false);
        const getPriceData = async () => {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${
              selectedCoin.id
            }/market_chart?vs_currency=${fiatCurrency}&days=${Math.ceil(
              (finishDate.getTime() - startDate.getTime()) /
                (1000 * 60 * 60 * 24)
            )}`
          );

          const fetchedData = await response.json();

          const priceDataArray = fetchedData.prices.map((el) => {
            const thisDate = new Date(el[0]);
            const thisPrice = el[1];
            return {
              price: thisPrice,
              date: new Date(thisDate),
            };
          });
          setPriceData(priceDataArray);
        };
        getPriceData();
      } catch {
        setError(true);
      }
    }
  }, [selectedCoin, fiatCurrency, startDate, finishDate]);

  const handleCalcModalClose = () => {
    setCalcMocalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value.length > 0) {
      setSearchModalOpen(true);
    } else {
      setSearchModalOpen(false);
    }
  };

  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.id.includes(searchVal) ||
        coin.symbol.includes(searchVal) ||
        coin.name.includes(searchVal)
    )
    .slice(0, 10);

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
    setSearchVal(coin.name);
    setSearchModalOpen(false);
  };

  const handleIntervalChange = (e) => {
    setIntervalDays(Number(e.target.value));
  };

  const handleInitialChange = (e) => {
    setInitialInvestment(Number(e.target.value));
  };

  const handlePeriodicChange = (e) => {
    setPeriodicInvestment(Number(e.target.value));
  };

  const handleStartDate = (e) => {
    setStartDate(new Date(e.target.value));
  };

  const handleFinishDate = (e) => {
    setFinishDate(new Date(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let spent = initialInvestment;
    if (priceData) {
      let totalCoinHolding = initialInvestment / priceData[0].price;
      for (let i = 1; i < priceData.length; i += intervalDays) {
        if (i <= priceData.length - intervalDays) {
          totalCoinHolding += periodicInvestment / priceData[i].price;
          spent += periodicInvestment;
        }
      }
      setTotalValue(totalCoinHolding * selectedCoin.current_price);
      setTotalSpent(spent);
    }
  };

  const today = new Date();

  return (
    <div
      className={`${
        theme === "light" ? "bg-[#ced4da]" : "bg-[#13121a]"
      } w-[350px] md:w-[886px] justify-between items-center flex flex-col fixed top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10 rounded-[20px] p-[48px] `}
    >
      <div className="w-[350px] md:w-full items-center px-[10px] py-0 md:p-0 mb-[20px] flex md:justify-between md:mb-[32px]">
        <h1 className="text-[24px] w-[350px] items-center">
          Investment Calculator (DCA)
        </h1>
        <button
          onClick={handleCalcModalClose}
          className={`${
            theme === "light" ? "border-black" : "border-white"
          } border rounded-[50%] flex justify-center items-center w-6 h-6`}
        >
          x
        </button>
      </div>
      <form onSubmit={handleSubmit} className="w-[350px] md:w-full">
        <div className="w-[350px] md:w-full mb-5 px-[10px] py-0 md:p-0 flex justify-between md:mb-8">
          <div
            className={`${
              theme === "light" ? "bg-[#ebebfd]" : "bg-[#191925]"
            } w-[30%] md:w-[170px] flex p-[8px] h-[44px] rounded-[4px] justify-around items-center `}
          >
            {!selectedCoin && <p>Your Coin</p>}
            {error && <p>error fetching coin data..</p>}
            {selectedCoin && (
              <>
                {" "}
                <img src={selectedCoin.image} className="w-7 h-7" />
                {size.width > parseInt(breakpoints.mobile) && (
                  <p className="text-4">{selectedCoin.name}</p>
                )}
                <p className="text-4">{selectedCoin.symbol.toUpperCase()}</p>
              </>
            )}
          </div>
          <>
            <input
              type="text"
              placeholder="Select coin"
              onChange={handleSearch}
              value={searchVal}
              className={`${
                theme === "light" ? "bg-[#ebebfd]" : "bg-[#191925]"
              } w-[60%] md:w-[588px] h-[44px] rounded-[4px] p-[8px]`}
            />
            {searchModalOpen && (
              <div className="w-[190px] right-[10px] md:w-[588px] flex flex-col bg-[#ebebfd] rounded-[6px] p-[10px] absolute z-2 mt-[44px] ml-[202px]">
                {filteredCoins.map((coin) => (
                  <div
                    key={coin.id}
                    onClick={() => handleSelectCoin(coin)}
                    className="cursor-pointer hover:bg-[#0077b6]:"
                  >
                    {coin.name}
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
        <div className="w-[350px] md:w-full flex mb-[16px] justify-between">
          <div className="w-[350px] md:w-[499px] px-[10px] py-0 md:p-0 flex justify-between">
            <input
              type="date"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={handleStartDate}
              className={`${
                theme === "light" ? "bg-[white]" : "bg-[#191925]"
              } w-[150px] md:w-[238px] rounded-[8px] pt-2 pr-6 pb-2 pl-2`}
            />
            <input
              type="date"
              value={finishDate ? finishDate.toISOString().split("T")[0] : ""}
              onChange={handleFinishDate}
              max={today.toISOString().split("T")[0]}
              className={`${
                theme === "light" ? "bg-[white]" : "bg-[#191925]"
              } w-[150px] md:w-[238px] pt-2 pr-6 pb-2 pl-2 rounded-[8px]`}
            />
          </div>
          {size.width > parseInt(breakpoints.mobile) && (
            <div
              className={`${
                theme === "light" ? "bg-[white]" : "bg-[#191925]"
              } w-[83px] rounded-lg p-2 text-center`}
            >
              Q-ty
            </div>
          )}
        </div>
        <div
          className={`${
            theme === "light" ? "bg-[#f3f5f9]" : "bg-[#191925]"
          } w-[330px] md:w-[100%] m-[0_0_20px_10px] md:m-[0_0_32px_0] rounded-[4px] p-[10px] md:p-[32px] flex flex-col gap-[12px]`}
        >
          <div className="w-full flex justify-between">
            <p className="text-[16px]">Contribution interval, days</p>
            <input
              placeholder={
                size.width > parseInt(breakpoints.mobile)
                  ? "Type Number"
                  : "Num"
              }
              value={intervalDays}
              onChange={handleIntervalChange}
              className={`${
                theme === "light"
                  ? "bg-[#f3f5f9] border-[#191925]"
                  : "bg-[#191925] border-[#f3f5f9]"
              } w-[60px] md:w-[110px] border text-center rounded`}
            />
          </div>
          <hr className="w-[100%] border-t border-[#b0b0eb]" />
          <div className="w-[100%] flex justify-between">
            <p className="text-[16px]">Initial investment, $</p>
            <input
              placeholder={
                size.width > parseInt(breakpoints.mobile)
                  ? "Type Number"
                  : "Num"
              }
              value={initialInvestment}
              onChange={handleInitialChange}
              className={`${
                theme === "light"
                  ? "bg-[#f3f5f9] border-[#191925]"
                  : "bg-[#191925] border-[#f3f5f9]"
              } w-[60px] md:w-[110px] border text-center rounded`}
            />
          </div>
          <hr className="w-[100%] border-t border-[#b0b0eb]" />
          <div className="w-[100%] flex justify-between">
            <p className="text-[16px]">investment each interval, $</p>
            <input
              placeholder={
                size.width > parseInt(breakpoints.mobile)
                  ? "Type Number"
                  : "Num"
              }
              value={periodicInvestment}
              onChange={handlePeriodicChange}
              className={`${
                theme === "light"
                  ? "bg-[#f3f5f9] border-[#191925]"
                  : "bg-[#191925] border-[#f3f5f9]"
              } w-[60px] md:w-[110px] border text-center rounded`}
            />
          </div>
          <hr className="w-[100%] border-t border-[#b0b0eb]" />
          <div className="w-[100%] flex justify-between">
            <p className="text-[16px]">Total amount spent, $</p>
            <p className="text-[20px]">${totalSpent}</p>
          </div>
          <hr className="w-[100%] border-t border-[#b0b0eb]" />
          <div className="w-[100%] flex justify-between">
            <p className="text-[16px]">Investment total value, $</p>
            <p className="text-[20px]">${Math.round(totalValue)}</p>
          </div>
        </div>
        <button
          type="submit"
          className={`${
            theme === "light" ? "bg-[#B0B0EB]" : "bg-[#6161d6]"
          } w-[330px] ml-[10px] md:w-[100%] md:ml-0 p-[12px] text-[16px] text-white rounded-[6px] `}
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default InvestmentCalc;
