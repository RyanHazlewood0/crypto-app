import { useState } from "react";
import styled from "styled-components";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import { OverviewIcon } from "./svg/overview";
import { PortfolioIcon } from "./svg/portfolio";
import { ConverterIcon } from "./svg/converter";
import Link from "next/link";
import { useCoin } from "@/app/contexts/CoinProvider";

const MobileBtnContainer = styled.div`
  position: fixed;
  bottom: 0;
  padding: 0;
  background: #232336;
  width: 375px;
`;

const MobileBtnInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #232336;
`;

const BtnContainer = styled.div<StyleProp>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 106.33px;
  background: ${(props) => (props.selected ? "#6161d6" : "#232336")};
  padding: 10px;
  border-radius: 6px;
`;

const Btn = styled.button``;

type StyleProp = {
  selected: boolean;
};

const MobileButtons = () => {
  const size = useWindowSize();
  const { selectedMobileBtn, setSelectedMobileBtn } = useCoin();
  return (
    <>
      {size.width < parseInt(breakpoints.mobile) && (
        <MobileBtnContainer>
          <MobileBtnInnerContainer>
            <Link href="/" onClick={() => setSelectedMobileBtn("Overview")}>
              <BtnContainer selected={selectedMobileBtn === "Overview"}>
                <OverviewIcon />
                <Btn>Overview</Btn>
              </BtnContainer>
            </Link>
            <Link
              href="/converter"
              onClick={() => setSelectedMobileBtn("Converter")}
            >
              <BtnContainer selected={selectedMobileBtn === "Converter"}>
                <ConverterIcon />
                <Btn>Converter</Btn>
              </BtnContainer>
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setSelectedMobileBtn("Portfolio")}
            >
              <BtnContainer selected={selectedMobileBtn === "Portfolio"}>
                <PortfolioIcon />
                <Btn>Portfolio</Btn>
              </BtnContainer>
            </Link>
          </MobileBtnInnerContainer>
        </MobileBtnContainer>
      )}
    </>
  );
};

export default MobileButtons;
