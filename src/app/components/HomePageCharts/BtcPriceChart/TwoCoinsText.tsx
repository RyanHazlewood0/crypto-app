import { breakpoints } from "breakpoints";
import { abbreviateNumber } from "helper-functions";
import styled from "styled-components";
import { Coin } from "types";

const TwoCoinsNameCont = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-left: 2.5%;
  margin-bottom: 2.5%;
`;

const CoinsText = styled.p`
  color: gray;
  font-size: 20px;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const CoinOneColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: #ff0054;
  @media (max-width: ${breakpoints.mobile}) {
    width: 14px;
    height: 14px;
  }
`;

const CoinTwoColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: #2d00f7;
  @media (max-width: ${breakpoints.mobile}) {
    width: 14px;
    height: 14px;
  }
`;

const CoinAndColorCont = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface TwoCoinsTextProps {
  selectedCoin: Coin[];
}

const TwoCoinsText = ({ selectedCoin }: TwoCoinsTextProps) => {
  return (
    <>
      {selectedCoin.length === 2 && (
        <>
          <TwoCoinsNameCont>
            <CoinAndColorCont>
              <CoinsText>
                {selectedCoin[0].symbol.toUpperCase() +
                  " " +
                  "$" +
                  abbreviateNumber(selectedCoin[0].current_price)}
              </CoinsText>
              <CoinTwoColor />
            </CoinAndColorCont>
            <CoinAndColorCont>
              <CoinsText>
                {selectedCoin[1].symbol.toUpperCase() +
                  " " +
                  "$" +
                  abbreviateNumber(selectedCoin[1].current_price)}
              </CoinsText>
              <CoinOneColor />
            </CoinAndColorCont>
          </TwoCoinsNameCont>
        </>
      )}
    </>
  );
};

export default TwoCoinsText;
