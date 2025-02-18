import { useEffect } from "react";
import { breakpoints } from "breakpoints";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
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
  background: ${(props) => props.color};
  @media (max-width: ${breakpoints.mobile}) {
    width: 14px;
    height: 14px;
  }
`;

const CoinTwoColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background: ${(props) => props.color};
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

type TwoCoinsTextProps = {
  selectedCoin: Coin[];
  coinColor1: string;
  coinColor2: string;
  setCoinColor1: any;
  setCoinColor2: any;
};

const TwoCoinsText = ({
  selectedCoin,
  coinColor1,
  coinColor2,
  setCoinColor1,
  setCoinColor2,
}: TwoCoinsTextProps) => {
  const { theme } = useCryptoContext();

  useEffect(() => {
    if (theme === "light") {
      if (selectedCoin.length === 1) {
        setCoinColor1("#a100f2");
      } else if (selectedCoin.length === 2) {
        setCoinColor1("#a100f2");
        setCoinColor2("#ff758f");
      }
    } else if (theme === "dark") {
      if (selectedCoin.length === 1) {
        setCoinColor1("#72ddf7");
      } else if (selectedCoin.length === 2) {
        setCoinColor1("#72ddf7");
        setCoinColor2("#bde0fe");
      }
    }
  }, [theme, selectedCoin]);

  return (
    <>
      {selectedCoin.length === 2 && (
        <TwoCoinsNameCont>
          <CoinAndColorCont>
            <CoinsText>
              {selectedCoin[0].symbol.toUpperCase() +
                " " +
                "$" +
                abbreviateNumber(selectedCoin[0].total_volume)}
            </CoinsText>
            <CoinTwoColor color={coinColor1} />
          </CoinAndColorCont>
          <CoinAndColorCont>
            <CoinsText>
              {selectedCoin[1].symbol.toUpperCase() +
                " " +
                "$" +
                abbreviateNumber(selectedCoin[1].total_volume)}
            </CoinsText>
            <CoinOneColor color={coinColor2} />
          </CoinAndColorCont>
        </TwoCoinsNameCont>
      )}
    </>
  );
};

export default TwoCoinsText;
