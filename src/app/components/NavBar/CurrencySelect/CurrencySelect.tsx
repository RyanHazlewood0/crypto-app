import styled from "styled-components";
import DollarSymbol from "../svg/DollarSymbol";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { useState, useRef, useEffect } from "react";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

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
    <div ref={wrapperRef} className={"relative z-3 h-[36px] w-[80px"}>
      <div
        onClick={handleToggleDropdown}
        className={`flex hover:cursor-pointer h-[36px] md:h-[44px] w-[80px] md:w-[108px] gap-2.5 relative justify-center items-center rounded-[6px] border border-solid border-gray-500  ${
          theme === "light" ? "bg-[#CCCCFA]" : "bg-[#191925]"
        }`}
      >
        {size.width > parseInt(breakpoints.mobile) && <DollarSymbol />}

        <p>{isClient ? fiatCurrency.toUpperCase() : "usd"}</p>
        <p>▼</p>
      </div>
      {fiatDropownOpen && (
        <div
          className={`flex p-2.5 flex-col border border-solid border-gray-500 w-[80px] md:w-[108px] rounded-[6px] text-center absolute  ${
            theme === "light" ? "bg-[#CCCCFA]" : "bg-[#191925]"
          }`}
        >
          {currencyOptions.map((currency) => (
            <div
              key={currency}
              onClick={(e) => handleCurrencySelect(e)}
              className={"w-full hover:cursor-pointer hover:bg-[#0077b6]"}
            >
              {currency.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelect;
