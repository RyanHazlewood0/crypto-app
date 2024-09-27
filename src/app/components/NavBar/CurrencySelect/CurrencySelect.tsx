import styled from "styled-components";
import DollarSymbol from "../svg/DollarSymbol";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { useState, useRef, useEffect } from "react";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

const CurrencyContainer = styled.div<ThemeProp>`
  display: flex;
  background: ${(props) => (props.light ? "#CCCCFA" : "#191925")};
  width: 100%;
  border: solid 1px gray;
  border-radius: 6px;
  height: 44px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    height: 36px;
  }
`;

const DropdownContainer = styled.div<ThemeProp>`
  color: ${(props) => (props.light ? "#353570" : "white")};
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.light ? "#CCCCFA" : "#191925")};
  padding: 10px;
  border: solid 1px gray;
  position: absolute;
  width: 108px;
  text-align: center;
  border-radius: 6px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 80px;
  }
`;

const DropdownAndOptionContainer = styled.div`
  width: 108px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 80px;
    height: 36px;
    position: relative;
    z-index: 3;
  }
`;

const CurrencyOptionContainer = styled.div`
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #0077b6;
  }
`;

type ThemeProp = {
  light?: boolean;
};

const CurrencySelect = () => {
  const { setFiatCurrency, fiatCurrency, isClient, theme } = useCryptoContext();
  const [fiatDropownOpen, setFiatDropdownOpen] = useState(false);
  const currencyOptions: string[] = ["usd", "nzd", "aud", "gbp"];
  const size = useWindowSize();

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
      <CurrencyContainer
        onClick={handleToggleDropdown}
        light={theme === "light"}
      >
        {size.width > parseInt(breakpoints.mobile) && <DollarSymbol />}

        <p>{isClient ? fiatCurrency.toUpperCase() : "usd"}</p>
        <p>▼</p>
      </CurrencyContainer>
      {fiatDropownOpen && (
        <DropdownContainer light={theme === "light"}>
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
