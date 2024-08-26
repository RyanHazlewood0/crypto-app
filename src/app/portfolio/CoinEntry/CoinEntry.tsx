import styled from "styled-components";
import { PortfolioCoin } from "../AddAssetForm/AddAssetForm";

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

interface CoinEntryProps {
  coin: PortfolioCoin;
}

const CoinEntry = ({ coin }: CoinEntryProps) => {
  return (
    <CoinEntryContainer>
      <CoinImageContainer>
        <img src={coin.image} />
      </CoinImageContainer>
      <CoinInfoContainer>{coin.name}</CoinInfoContainer>
    </CoinEntryContainer>
  );
};

export default CoinEntry;
