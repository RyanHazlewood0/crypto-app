import { useState } from "react";
import styled from "styled-components";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import { OverviewIcon } from "./svg/overview";
import { PortfolioIcon } from "./svg/portfolio";
import { ConverterIcon } from "./svg/converter";

const MobileBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #191932;
  position: fixed;
  bottom: 0;
  padding: 10px 0 10px 0;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 106.33px;
`;

const MobileButtons = () => {
  const size = useWindowSize();

  return (
    <>
      {size.width < parseInt(breakpoints.mobile) && (
        <MobileBtnContainer>
          <BtnContainer>
            <OverviewIcon />
            <button>Overview</button>
          </BtnContainer>
          <BtnContainer>
            <ConverterIcon />
            <button>Converter</button>
          </BtnContainer>
          <BtnContainer>
            <PortfolioIcon />
            <button>Portfolio</button>
          </BtnContainer>
        </MobileBtnContainer>
      )}
    </>
  );
};

export default MobileButtons;
