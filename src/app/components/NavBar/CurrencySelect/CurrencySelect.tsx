import styled from "styled-components";
import DollarSymbol from "../svg/DollarSymbol";

const CurrencyContainer = styled.div`
  display: flex;
  background: #191925;
  width: 108px;
  border: solid 1px gray;
  border-radius: 6px;
  height: 44px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const CurrencySelect = () => {
  return (
    <CurrencyContainer>
      <DollarSymbol />
      <p>USD</p>
      <p>▼</p>
    </CurrencyContainer>
  );
};

export default CurrencySelect;
