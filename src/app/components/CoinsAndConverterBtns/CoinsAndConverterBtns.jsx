import styled from "styled-components";
import Link from "next/link";

const BtnsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const CoinsBtnContainer = styled.div`
  background: #6161d6;
  color: white;
  width: 244px;
  height: 45px;
  font-size: 16px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConverterBtnContainer = styled.div`
  background: #232336;
  color: white;
  width: 244px;
  height: 45px;
  font-size: 16px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsAndConverterBtns = () => {
  return (
    <BtnsContainer>
      <Link href="/">
        <CoinsBtnContainer>Coins</CoinsBtnContainer>
      </Link>
      <Link href="/converter">
        <ConverterBtnContainer>Converter</ConverterBtnContainer>
      </Link>
    </BtnsContainer>
  );
};

export default CoinsAndConverterBtns;
