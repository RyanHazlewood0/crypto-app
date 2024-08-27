import styled from "styled-components";
import { PortfolioCoin } from "../AddAssetForm/AddAssetForm";
import { Dispatch, SetStateAction } from "react";

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
`;

const CoinInfoContainer = styled.div`
  width: 1038px;
  height: 100%;
  background: #2f184b;
  padding: 20px;
`;

const DeleteBtn = styled.button`
  width: 60px;
  background: black;
  padding: 10px;
  margin-left: 50px;
  height: 40px;
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
  // const deleteEntry = (thisCoin: PortfolioCoin) => {
  //   const filteredPortfolio = portfolioCoins.filter((coin) => {
  //     return coin.name !== thisCoin.name;
  //   });
  //   setPortfolioCoins(filteredPortfolio);
  // };

  return (
    <CoinEntryContainer>
      <CoinImageContainer>
        <img src={coin.image} />
      </CoinImageContainer>
      <CoinInfoContainer>
        {coin.name}
        {/* <DeleteBtn onClick={deleteEntry(coin)}>Delete</DeleteBtn> */}
      </CoinInfoContainer>
    </CoinEntryContainer>
  );
};

export default CoinEntry;
