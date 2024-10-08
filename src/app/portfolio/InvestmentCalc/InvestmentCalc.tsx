import { useState } from "react";
import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

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
  gap: 5px;
  background: #ebebfd;
  width: 170px;
  height: 44px;
  border-radius: 4px;
`;

const CoinSelect = styled.input`
  background: #ebebfd;
  width: 588px;
  height: 44px;
  border-radius: 4px;
  padding: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;
const InvestmentBtn = styled.button<SelectedProp>`
  background: ${(props) => (props.selected ? "#B0B0EB" : "#EBEBFD")};
  width: 50%;
  padding: 12px;
  border-radius: 6px;
  color: ${(props) => (props.selected ? "white" : "#B0B0EB")};
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

type SelectedProp = {
  selected?: boolean;
};

interface InvestmentCalcProps {
  setCalcMocalOpen: Dispatch<SetStateAction<boolean>>;
}

const InvestmentCalc = ({ setCalcMocalOpen }: InvestmentCalcProps) => {
  const [btnSelected, setBtnSelected] = useState<string>("Value Cost Average");

  const handleCalcModalClose = () => {
    setCalcMocalOpen(false);
  };

  const toggleSelected = () => {
    if (btnSelected === "Value Cost Average") {
      setBtnSelected("Dollar Cost Average");
    } else {
      setBtnSelected("Value Cost Average");
    }
  };

  return (
    <CalcModal>
      <HeaderContainer>
        <HeaderText>Investment Calculator</HeaderText>
        <QuitBtn onClick={handleCalcModalClose}>x</QuitBtn>
      </HeaderContainer>
      <CoinContainer>
        <CoinDisplay></CoinDisplay>
        <CoinSelect type="text" placeholder="Select coin" />
      </CoinContainer>
      <ButtonContainer>
        <InvestmentBtn
          onClick={toggleSelected}
          selected={btnSelected === "Value Cost Average"}
        >
          Value Cost Average
        </InvestmentBtn>
        <InvestmentBtn
          onClick={toggleSelected}
          selected={btnSelected === "Dollar Cost Average"}
        >
          Dollar Cost Average
        </InvestmentBtn>
      </ButtonContainer>
      <DatesContainer>
        <DatesInnerContainer>
          <DateInput type="date" />
          <DateInput type="date" />
        </DatesInnerContainer>
        <QuantitySymbol>Q-ty</QuantitySymbol>
      </DatesContainer>
      <InfoContainer>
        <InfoRow>
          <InfoText>Contribution interval, days</InfoText>
          <NumText>50</NumText>
        </InfoRow>
        <Line />
        <InfoRow>
          <InfoText>Initial investment, $</InfoText>
          <NumText>50</NumText>
        </InfoRow>
        <Line />
        <InfoRow>
          <InfoText>investment added each week, $</InfoText>
          <NumText>50</NumText>
        </InfoRow>
        <Line />
        <InfoRow>
          <InfoText>Total amount spent, $</InfoText>
          <NumText>50</NumText>
        </InfoRow>
        <Line />
        <InfoRow>
          <InfoText>Investment total value, $</InfoText>
          <NumText>50</NumText>
        </InfoRow>
      </InfoContainer>
      <CalculateBtn>Calculate</CalculateBtn>
    </CalcModal>
  );
};

export default InvestmentCalc;
