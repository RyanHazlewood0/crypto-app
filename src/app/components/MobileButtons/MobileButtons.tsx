import styled from "styled-components";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import { OverviewIcon } from "./svg/overview";
import { PortfolioIcon } from "./svg/portfolio";
import { ConverterIcon } from "./svg/converter";
import Link from "next/link";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";

const MobileBtnContainer = styled.div`
  position: fixed;
  bottom: 0;
  padding: 0;
  background: #232336;
  width: 375px;
`;

const MobileBtnInnerContainer = styled.div<StyleProp>`
  display: flex;
  justify-content: space-between;
  background: ${(prop) => (prop.$light ? "white" : "#232336")};
`;

const BtnContainer = styled.div<StyleProp>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 106.33px;
  background: ${(props) => {
    if (props.$light) {
      if (props.$selected) {
        return "#B0B0EB";
      } else {
        return "white";
      }
    } else {
      if (props.$selected) {
        return "#6161d6";
      } else {
        return "#232336";
      }
    }
  }};
  padding: 10px;
  border-radius: 6px;
`;

const Btn = styled.button``;

type StyleProp = {
  $selected?: boolean;
  $light?: boolean;
};

const MobileButtons = () => {
  const size = useWindowSize();
  const { selectedMobileBtn, setSelectedMobileBtn, theme } = useCryptoContext();

  return (
    <>
      {size.width < parseInt(breakpoints.mobile) && (
        <MobileBtnContainer>
          <MobileBtnInnerContainer $light={theme === "light"}>
            <Link href="/">
              <BtnContainer
                $light={theme === "light"}
                $selected={selectedMobileBtn === "Overview"}
                onClick={() => setSelectedMobileBtn("Overview")}
              >
                <OverviewIcon />
                <Btn>Overview</Btn>
              </BtnContainer>
            </Link>
            <Link href="/">
              <BtnContainer
                $light={theme === "light"}
                $selected={selectedMobileBtn === "Converter"}
                onClick={() => setSelectedMobileBtn("Converter")}
              >
                <ConverterIcon />
                <Btn>Converter</Btn>
              </BtnContainer>
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setSelectedMobileBtn("Portfolio")}
            >
              <BtnContainer
                $light={theme === "light"}
                $selected={selectedMobileBtn === "Portfolio"}
              >
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
