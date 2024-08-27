import styled from "styled-components";
import { PortfolioCoin } from "../AddAssetForm/AddAssetForm";
import { Dispatch, SetStateAction } from "react";
import EditIcon from "../svg/edit-2";

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

const ValueBox = styled.div`
  flex-direction: column;
  display: flex;
`;

interface CoinEntryProps {
  coin: PortfolioCoin;
  portfolioCoins: PortfolioCoin[];
  setPortfolioCoins: Dispatch<SetStateAction<[] | PortfolioCoin[]>>;
}

const CoinEntry = ({
  coin,
  setPortfolioCoins,
  portfolioCoins,
}: CoinEntryProps) => {
  const deleteEntry = (thisCoin: PortfolioCoin) => {
    const filteredPortfolio = portfolioCoins.filter(
      (coin) => coin.name !== thisCoin.name
    );
    setPortfolioCoins(filteredPortfolio);
  };

  return (
    <CoinEntryContainer>
      <CoinImageContainer>
        <Symbol src={coin.image} />
        <NameText>{coin.name}</NameText>
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
              <NumberText>${coin.currentPrice}</NumberText>
            </ValueBox>
            <ValueBox>
              <SmallText>Price Change 24h</SmallText>
              <NumberText>{coin.priceChange24h}</NumberText>
            </ValueBox>
            <ValueBox>
              <SmallText>Market Cap vs Volume</SmallText>
              <NumberText>{coin.mCapVsVol}</NumberText>
            </ValueBox>
            <ValueBox>
              <SmallText>Cicrulating vs Total Supply</SmallText>
              <NumberText>{coin.circVsTotalSupply}</NumberText>
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
              <NumberText>${coin.totalValue}</NumberText>
            </ValueBox>
            <ValueBox>
              <SmallText>Price Change Since Purchase</SmallText>
              <NumberText>{coin.priceChangeSincePurchase}</NumberText>
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
