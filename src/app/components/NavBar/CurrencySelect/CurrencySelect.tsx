import styled from "styled-components";
import DollarSymbol from "../svg/DollarSymbol";
import { useCoin } from "@/app/contexts/CoinProvider";
import { useState, useRef, useEffect } from "react";

const CurrencyContainer = styled.div`
  display: flex;
  background: #191925;
  width: 100%;
  border: solid 1px gray;
  border-radius: 6px;
  height: 44px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
`;

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #191925;
  padding: 10px;
  border: solid 1px gray;
  position: absolute;
  width: 108px;
  text-align: center;
`;

const DropdownAndOptionContainer = styled.div`
  width: 108px;
`;

const CurrencyOptionContainer = styled.div`
  width: 100%;
  cursor: pointer;
`;

const CurrencySelect = () => {
  const [fiatDropownOpen, setFiatDropdownOpen] = useState(false);
  const { fiatCurrency, setFiatCurrency } = useCoin();
  const currencyOptions: string[] = ["usd", "nzd", "aud", "gbp"];

  const handleToggleDropdown = () => {
    setFiatDropdownOpen(!fiatDropownOpen);
  };

  const handleCurrencySelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.textContent.toLowerCase();
    setFiatCurrency(value);
    handleToggleDropdown();
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setFiatDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <DropdownAndOptionContainer ref={wrapperRef}>
      <CurrencyContainer onClick={handleToggleDropdown}>
        <DollarSymbol />
        <p>{fiatCurrency.toUpperCase()}</p>
        <p>▼</p>
      </CurrencyContainer>
      {fiatDropownOpen && (
        <DropdownContainer>
          {currencyOptions.map((currency) => (
            <CurrencyOptionContainer
              key={currency}
              onClick={(e) => handleCurrencySelect(e)}
            >
              {currency.toUpperCase()}
            </CurrencyOptionContainer>
          ))}
        </DropdownContainer>
      )}
    </DropdownAndOptionContainer>
  );
};

export default CurrencySelect;
