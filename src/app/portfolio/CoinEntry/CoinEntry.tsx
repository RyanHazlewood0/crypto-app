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
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

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

const MobEntryContainer = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  flex-direction: column;
  background: #191932;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 16px;
  justify-content: space-between;
`;

const MobNameDateImgContainer = styled.div`
  display: flex;
  justify-content: left;
  width: 50%;
  gap: 20px;
`;

const EditDeleteBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  justify-content: right;
  gap: 20px;
`;

const MobNameDateContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobValueRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MobileValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 155.5px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  align-items: center;
  padding: 10px;
`;

const MobNameAndNumtext = styled.div`
  font-size: 16px;
`;
const MobDatetext = styled.div`
  font-size: 12px;
`;
const MobPrictext = styled.div`
  font-size: 20px;
`;
const MobSmallText = styled.div`
  font-size: 12px;
  color: #e8e8e8;
`;

const HeaderContainer = styled.div`
  display: flex;
`;

type TextColor = {
  green: boolean;
};

interface CoinEntryProps {
  coin: PortfolioCoin;
  portfolioCoins: PortfolioCoin[];
  setPortfolioCoins: Dispatch<SetStateAction<[] | PortfolioCoin[]>>;
  editCoinEntry: (
    e: React.MouseEvent<HTMLButtonElement>,
    coin: PortfolioCoin
  ) => void;
  isEditOpen: any;
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
  editCoinEntry,
  isEditOpen,
}: CoinEntryProps) => {
  const [error, setError] = useState(false);
  const { fiatCurrency } = useCoin();
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
            `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=falsex_cg_pro_api_key=${apiKey}`
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
    return <p>error fetching data</p>;
  }

  if (coin) {
    if (size.width < parseInt(breakpoints.mobile)) {
      return (
        <>
          <MobEntryContainer>
            <HeaderContainer>
              <MobNameDateImgContainer>
                <MobNameDateContainer>
                  <MobNameAndNumtext>{coin.name}</MobNameAndNumtext>
                  <MobDatetext>
                    {coin.purchaseDate.toISOString().split("T")[0]}
                  </MobDatetext>
                </MobNameDateContainer>
                <Symbol src={coin.image} style={{ width: "43px" }} />
              </MobNameDateImgContainer>
              <EditDeleteBtnContainer>
                <Btn onClick={(e) => editCoinEntry(e, coin)}>
                  <EditIcon />
                </Btn>
                <Btn onClick={() => deleteEntry(coin)}>X</Btn>
              </EditDeleteBtnContainer>
            </HeaderContainer>
            <MobPrictext>
              {" "}
              <SmallText>Total Value</SmallText>${abbreviateNumber(totalVal)}
            </MobPrictext>
            <MobValueRow>
              <MobileValueContainer>
                <MobNameAndNumtext>
                  ${abbreviateNumber(currentP)}
                </MobNameAndNumtext>
                <MobSmallText>Current Price</MobSmallText>
              </MobileValueContainer>
              <MobileValueContainer>
                <PriceChangeText green={coin.priceChange24h > 0}>
                  {coin.priceChange24h > 0 ? <GreenArrow /> : <RedArrow />}
                  {abbreviateNumber(change24)}%
                </PriceChangeText>
                <MobSmallText>24h%</MobSmallText>
              </MobileValueContainer>
            </MobValueRow>
            <MobValueRow>
              <MobileValueContainer>
                <PriceChangeText green={coin.priceChange24h > 0}>
                  {coin.priceChange24h > 0 ? <GreenArrow /> : <RedArrow />}
                  {abbreviateNumber(changeSincePurchase)}%
                </PriceChangeText>
                <MobSmallText>% Since Purchase</MobSmallText>
              </MobileValueContainer>
              <MobileValueContainer>
                <MobNameAndNumtext>{coin.totalAmount}</MobNameAndNumtext>
                <MobSmallText>Coin Amount</MobSmallText>
              </MobileValueContainer>
            </MobValueRow>
          </MobEntryContainer>
        </>
      );
    } else {
      return (
        <CoinEntryContainer>
          <CoinImageContainer>
            <Symbol src={coin.image} />
            <NameText>
              {coin.name} ({coin.symbol.toUpperCase()})
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
                  <NumberText>${abbreviateNumber(currentP)}</NumberText>
                </ValueBox>
                <ValueBox>
                  <SmallText>Price Change 24h</SmallText>
                  <PriceChangeText green={coin.priceChange24h > 0}>
                    {coin.priceChange24h > 0 ? <GreenArrow /> : <RedArrow />}
                    {abbreviateNumber(change24)}%
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
                <Btn onClick={(e) => editCoinEntry(e, coin)}>
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
                  <NumberText>${abbreviateNumber(totalVal)}</NumberText>
                </ValueBox>
                <ValueBox>
                  <SmallText>Price Change Since Purchase</SmallText>
                  <PriceChangeText green={currentP > purchasePrice}>
                    {currentP > purchasePrice ? <GreenArrow /> : <RedArrow />}
                    {currentP < purchasePrice && "- "}
                    {abbreviateNumber(changeSincePurchase)}%
                  </PriceChangeText>
                </ValueBox>
                <ValueBox>
                  <SmallText>Purchase Date</SmallText>
                  <NumberText>
                    {coin.purchaseDate.toISOString().split("T")[0]}
                  </NumberText>
                </ValueBox>
              </InnerRow>
            </Row>
          </CoinInfoContainer>
        </CoinEntryContainer>
      );
    }
  }
};

export default CoinEntry;
