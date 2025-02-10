import { useState, useEffect } from "react";
import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

const CalcModal = styled.div<ThemeProp>`
  width: 886px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  background: ${(props) => (props.$light ? "#ced4da" : "#13121a")};
  border-radius: 20px;
  padding: 48px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 350px;
    align-items: center;
  }
`;

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

const CoinContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 350px;
    padding: 0 10px 0 10px;
    margin-bottom: 20px;
  }
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
    props.light ? "solid 1px #191925" : "solid 1px #f3f5f9"};
  border-radius: 4px;
  padding: 0 5px 0 5px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 60px;
  }
`;

interface InvestmentCalcProps {
  setCalcMocalOpen: Dispatch<SetStateAction<boolean>>;
}

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
            `https://pro-api.coingecko.com/api/v3/coins/${
              selectedCoin.id
            }/market_chart/range?vs_currency=${fiatCurrency}&from=${Math.floor(
              startDate.getTime() / 1000
            )}&to=${Math.floor(
              finishDate.getTime() / 1000
            )}&interval=daily&x_cg_pro_api_key=${apiKey}`
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
    <CalcModal $light={theme === "light"}>
      <HeaderContainer>
        <HeaderText>Investment Calculator (DCA)</HeaderText>
        <QuitBtn onClick={handleCalcModalClose} $light={theme === "light"}>
          x
        </QuitBtn>
      </HeaderContainer>
      <form onSubmit={handleSubmit}>
        <CoinContainer>
          <CoinDisplay $light={theme === "light"}>
            {!selectedCoin && <p>Your Coin</p>}
            {error && <p>error fetching coin data..</p>}
            {selectedCoin && (
              <>
                {" "}
                <CoinImage src={selectedCoin.image} />
                {size.width > parseInt(breakpoints.mobile) && (
                  <CoinText>{selectedCoin.name}</CoinText>
                )}
                <CoinText>{selectedCoin.symbol.toUpperCase()}</CoinText>
              </>
            )}
          </CoinDisplay>
          <>
            <CoinSelect
              type="text"
              placeholder="Select coin"
              onChange={handleSearch}
              value={searchVal}
              $light={theme === "light"}
            />
            {searchModalOpen && (
              <SearchModal>
                {filteredCoins.map((coin) => (
                  <CoinOption
                    key={coin.id}
                    onClick={() => handleSelectCoin(coin)}
                  >
                    {coin.name}
                  </CoinOption>
                ))}
              </SearchModal>
            )}
          </>
        </CoinContainer>
        <DatesContainer>
          <DatesInnerContainer>
            <DateInput
              type="date"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={handleStartDate}
              $light={theme === "light"}
            />
            <DateInput
              type="date"
              value={finishDate ? finishDate.toISOString().split("T")[0] : ""}
              onChange={handleFinishDate}
              max={today.toISOString().split("T")[0]}
              $light={theme === "light"}
            />
          </DatesInnerContainer>
          {size.width > parseInt(breakpoints.mobile) && (
            <QuantitySymbol $light={theme === "light"}>Q-ty</QuantitySymbol>
          )}
        </DatesContainer>
        <InfoContainer $light={theme === "light"}>
          <InfoRow>
            <InfoText>Contribution interval, days</InfoText>
            <NumberInput
              placeholder={
                size.width > parseInt(breakpoints.mobile)
                  ? "Type Number"
                  : "Num"
              }
              value={intervalDays}
              onChange={handleIntervalChange}
              $light={theme === "light"}
            />
          </InfoRow>
          <Line />
          <InfoRow>
            <InfoText>Initial investment, $</InfoText>
            <NumberInput
              placeholder={
                size.width > parseInt(breakpoints.mobile)
                  ? "Type Number"
                  : "Num"
              }
              value={initialInvestment}
              onChange={handleInitialChange}
              $light={theme === "light"}
            />
          </InfoRow>
          <Line />
          <InfoRow>
            <InfoText>investment each interval, $</InfoText>
            <NumberInput
              placeholder={
                size.width > parseInt(breakpoints.mobile)
                  ? "Type Number"
                  : "Num"
              }
              value={periodicInvestment}
              onChange={handlePeriodicChange}
              $light={theme === "light"}
            />
          </InfoRow>
          <Line />
          <InfoRow>
            <InfoText>Total amount spent, $</InfoText>
            <NumText>${totalSpent}</NumText>
          </InfoRow>
          <Line />
          <InfoRow>
            <InfoText>Investment total value, $</InfoText>
            <NumText>${Math.round(totalValue)}</NumText>
          </InfoRow>
        </InfoContainer>
        <CalculateBtn type="submit" $light={theme === "light"}>
          Calculate
        </CalculateBtn>
      </form>
    </CalcModal>
  );
};

export default InvestmentCalc;
