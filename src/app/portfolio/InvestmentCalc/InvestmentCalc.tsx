import { useState, useEffect } from "react";
import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";

const CalcModal = styled.div`
  width: 886px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: white;
  border-radius: 20px;
  padding: 48px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const HeaderText = styled.h1`
  font-size: 24px;
`;

const QuitBtn = styled.button`
  width: 24px;
  height: 24px;
  border: solid 1px black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;
const CoinDisplay = styled.div`
  display: flex;
  padding: 8px;
  background: #ebebfd;
  width: 170px;
  height: 44px;
  border-radius: 4px;
  justify-content: space-around;
  align-items: center;
`;

const CoinSelect = styled.input`
  background: #ebebfd;
  width: 588px;
  height: 44px;
  border-radius: 4px;
  padding: 8px;
`;

const DatesContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
`;
const DatesInnerContainer = styled.div`
  display: flex;
  width: 499px;
  justify-content: space-between;
`;
const DateInput = styled.input`
  background: #f3f5f9;
  width: 238px;
  padding: 8px 24px 8px 8px;
  border-radius: 8px;
`;

const QuantitySymbol = styled.div`
  width: 83px;
  border-radius: 8px;
  padding: 8px;
  background: #ebebfd;
  text-align: center;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f3f5f9;
  padding: 32px;
  margin-bottom: 32px;
  gap: 12px;
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

const CalculateBtn = styled.button`
  width: 100%;
  background: #b0b0eb;
  padding: 12px;
  font-size: 16px;
  color: white;
  border-radius: 6px;
`;

const SearchModal = styled.div`
  display: flex;
  flex-direction: column;
  background: #f3f5f9;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 2;
  width: 588px;
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

const NumberInput = styled.input`
  width: 110px;
  background: #f3f5f9;
  border: solid 1px black;
  border-radius: 4px;
  padding: 0 5px 0 5px;
`;

interface InvestmentCalcProps {
  setCalcMocalOpen: Dispatch<SetStateAction<boolean>>;
}

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

  const { coins, fiatCurrency } = useCryptoContext();

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
          setPriceData(
            fetchedData.prices.map((el) => {
              const thisDate = new Date(el[0]);
              const thisPrice = el[1];
              return {
                price: thisPrice,
                date: new Date(thisDate),
              };
            })
          );
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

  return (
    <CalcModal>
      <HeaderContainer>
        <HeaderText>Investment Calculator (Dollar Cost Average)</HeaderText>
        <QuitBtn onClick={handleCalcModalClose}>x</QuitBtn>
      </HeaderContainer>
      <form onSubmit={handleSubmit}>
        <CoinContainer>
          <CoinDisplay>
            {!selectedCoin && <p>Your Coin</p>}
            {error && <p>error fetching coin data..</p>}
            {selectedCoin && (
              <>
                {" "}
                <CoinImage src={selectedCoin.image} />
                <CoinText>{selectedCoin.name}</CoinText>
                <CoinText>{selectedCoin.symbol.toUpperCase()}</CoinText>
              </>
            )}
          </CoinDisplay>
          <div>
            <CoinSelect
              type="text"
              placeholder="Select coin"
              onChange={handleSearch}
              value={searchVal}
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
          </div>
        </CoinContainer>
        <DatesContainer>
          <DatesInnerContainer>
            <DateInput
              type="date"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={handleStartDate}
            />
            <DateInput
              type="date"
              value={finishDate ? finishDate.toISOString().split("T")[0] : ""}
              onChange={handleFinishDate}
            />
          </DatesInnerContainer>
          <QuantitySymbol>Q-ty</QuantitySymbol>
        </DatesContainer>
        <InfoContainer>
          <InfoRow>
            <InfoText>Contribution interval, days</InfoText>
            <NumberInput
              placeholder="Type Number"
              value={intervalDays}
              onChange={handleIntervalChange}
            />
          </InfoRow>
          <Line />
          <InfoRow>
            <InfoText>Initial investment, $</InfoText>
            <NumberInput
              placeholder="Type Number"
              value={initialInvestment}
              onChange={handleInitialChange}
            />
          </InfoRow>
          <Line />
          <InfoRow>
            <InfoText>investment added each interval, $</InfoText>
            <NumberInput
              placeholder="Type Number"
              value={periodicInvestment}
              onChange={handlePeriodicChange}
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
            <NumText>${totalValue}</NumText>
          </InfoRow>
        </InfoContainer>
        <CalculateBtn type="submit">Calculate</CalculateBtn>
      </form>
    </CalcModal>
  );
};

export default InvestmentCalc;
