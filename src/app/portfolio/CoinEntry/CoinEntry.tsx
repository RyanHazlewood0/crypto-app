import styled from "styled-components";
import { useEffect, useState } from "react";
import { useCoin } from "@/app/contexts/CoinProvider";
import { PortfolioCoin } from "../AddAssetForm/AddAssetForm";
import { Dispatch, SetStateAction } from "react";
import EditIcon from "../svg/edit-2";
import { abbreviateNumber } from "@/app/components/Table/helper-functions";
import RedArrow from "../svg/RedArrow";
import GreenArrow from "../svg/GreenArrow";
import {
  findSupplyLevel,
  findVolumeLevel,
} from "@/app/components/Table/helper-functions";

const CoinEntryContainer = styled.div`
  width: 100%;
  height: 292px;
  display: flex;
  margin-bottom: 25px;
`;

const CoinImageContainer = styled.div`
  width: 258px;
  height: 100%;
  background: #1e1932;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinInfoContainer = styled.div`
  width: 1038px;
  height: 100%;
  background: #191932;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  gap: 10px;
`;

const InnerRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
  background: #3a3978;
  padding: 10px;
  border-radius: 4px;
  height: 40px;
  width: 40px;
`;

const Symbol = styled.img`
  width: 64px;
`;

const NameText = styled.p`
  font-size: 28px;
  font-weight: bold;
`;

const Line = styled.hr`
  width: 100%;
`;

const TitleText = styled.p`
  font-size: 20px;
`;

const SmallText = styled.p`
  font-size: 14px;
`;
const NumberText = styled.p`
  font-size: 16px;
`;

const PriceChangeText = styled.p<TextColor>`
  font-size: 16px;
  color: ${(props) => (props.green ? "#01F1E3" : "#FE2264")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ValueBox = styled.div`
  flex-direction: column;
  display: flex;
`;

const LevelIndicatorOuter = styled.div`
  display: flex;
  height: 5px;
  background-color: #40916c;
  border-radius: 5px;
  width: 55px;
`;

const LevelIndicatorInner = styled.div`
  height: 5px;
  background-color: #01f1e3;
  border-radius: 5px;
`;

const NumberAndLevelBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type TextColor = {
  green: boolean;
};

interface CoinEntryProps {
  coin: PortfolioCoin;
  portfolioCoins: PortfolioCoin[];
  setPortfolioCoins: Dispatch<SetStateAction<[] | PortfolioCoin[]>>;
}

interface FetchedDataType {
  prices: [number, number][];
}
export interface CoinPriceDataTypes {
  price: number;
  date: string;
}

const CoinEntry = ({
  coin,
  setPortfolioCoins,
  portfolioCoins,
}: CoinEntryProps) => {
  const [error, setError] = useState(false);
  const { fiatCurrency } = useCoin();
  const [priceData, setPriceData] = useState<CoinPriceDataTypes[] | null>(null);
  const [purchasePrice, setPurchasePrice] = useState<number | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setError(false);
    if (coin) {
      const fetchPriceData = async () => {
        try {
          const response: Response = await fetch(
            `https://pro-api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${fiatCurrency}&days=3000&interval=daily&x_cg_pro_api_key=${apiKey}`
          );
          const fetchedData: FetchedDataType = await response.json();
          setPriceData(
            fetchedData.prices.map((el) => {
              const thisDate = new Date(el[0]);
              const thisPrice = el[1];
              return {
                price: thisPrice,
                date: thisDate.toLocaleDateString(),
              };
            })
          );
        } catch {
          setError(true);
        }
      };
      fetchPriceData();
    }
  }, []);

  useEffect(() => {
    if (priceData) {
      const thisPriceData = priceData.find(
        (el) => el.date === coin.purchaseDate.toLocaleDateString()
      );
      setPurchasePrice(thisPriceData.price);
    }
  }, [priceData]);

  const deleteEntry = (thisCoin: PortfolioCoin) => {
    const filteredPortfolio = portfolioCoins.filter(
      (coin) => coin.name !== thisCoin.name
    );
    setPortfolioCoins(filteredPortfolio);
  };

  if (error) {
    return <p>error fetching data</p>;
  }

  const getChangeFromPurchaseDate = () => {
    const currentPrice = coin.currentPrice;
    const biggerNum = Math.max(purchasePrice, currentPrice);
    const smallerNum = Math.min(purchasePrice, currentPrice);
    const difference = biggerNum - smallerNum;
    const average = (biggerNum + smallerNum) / 2;
    const diffByAvg = difference / average;
    const percentDiff = diffByAvg * 100;
    return percentDiff;
  };

  return (
    <CoinEntryContainer>
      <CoinImageContainer>
        <Symbol src={coin.image} />
        <NameText>
          {coin.name} ({coin.symbol})
        </NameText>
      </CoinImageContainer>
      <CoinInfoContainer>
        <Row>
          <InnerRow>
            <TitleText>Market Price</TitleText>
            <Btn onClick={() => deleteEntry(coin)}>X</Btn>
          </InnerRow>
          <InnerRow>
            <ValueBox>
              <SmallText>Current Price</SmallText>
              <NumberText>${abbreviateNumber(coin.currentPrice)}</NumberText>
            </ValueBox>
            <ValueBox>
              <SmallText>Price Change 24h</SmallText>
              <PriceChangeText green={coin.priceChange24h > 0}>
                {coin.priceChange24h > 0 ? <GreenArrow /> : <RedArrow />}
                {abbreviateNumber(coin.priceChange24h)}%
              </PriceChangeText>
            </ValueBox>
            <ValueBox>
              <SmallText>24h Vol Vs M-Cap</SmallText>
              <NumberAndLevelBox>
                <NumberText>
                  <div>{abbreviateNumber(findVolumeLevel(coin))}%</div>
                </NumberText>
                <LevelIndicatorOuter>
                  <LevelIndicatorInner
                    style={{ width: `${findVolumeLevel(coin)}%` }}
                  />
                </LevelIndicatorOuter>
              </NumberAndLevelBox>
            </ValueBox>
            <ValueBox>
              <SmallText>Circ vs Total Supply</SmallText>
              <NumberAndLevelBox>
                <NumberText>
                  <div>{abbreviateNumber(findSupplyLevel(coin))}%</div>
                </NumberText>
                <LevelIndicatorOuter>
                  <LevelIndicatorInner
                    style={{ width: `${findSupplyLevel(coin)}%` }}
                  />
                </LevelIndicatorOuter>
              </NumberAndLevelBox>
            </ValueBox>
          </InnerRow>
        </Row>
        <Line />
        <Row>
          <InnerRow>
            <TitleText>Your Coin</TitleText>
            <Btn>
              <EditIcon />
            </Btn>
          </InnerRow>
          <InnerRow>
            <ValueBox>
              <SmallText>Current Amount</SmallText>
              <NumberText>{coin.totalAmount}</NumberText>
            </ValueBox>
            <ValueBox>
              <SmallText>Amount Value</SmallText>
              <NumberText>${abbreviateNumber(coin.totalValue)}</NumberText>
            </ValueBox>
            <ValueBox>
              <SmallText>Price Change Since Purchase</SmallText>
              <PriceChangeText green={coin.currentPrice > purchasePrice}>
                {coin.currentPrice > purchasePrice ? (
                  <GreenArrow />
                ) : (
                  <RedArrow />
                )}
                {coin.currentPrice < purchasePrice && "- "}
                {abbreviateNumber(getChangeFromPurchaseDate())}%
              </PriceChangeText>
            </ValueBox>
            <ValueBox>
              <SmallText>Purchase Date</SmallText>
              <NumberText>{coin.purchaseDate.toLocaleDateString()}</NumberText>
            </ValueBox>
          </InnerRow>
        </Row>
      </CoinInfoContainer>
    </CoinEntryContainer>
  );
};

export default CoinEntry;
