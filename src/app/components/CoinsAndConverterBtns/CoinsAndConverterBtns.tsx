import styled from "styled-components";
import Link from "next/link";
import { useCoin } from "@/app/contexts/CoinProvider";
import { breakpoints } from "breakpoints";

const BtnsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 375px;
  }
`;

const Btn = styled.div<StyleProp>`
  background: ${(props) => {
    if (props.light) {
      return props.selected ? "#a7a7cc" : "white";
    } else {
      return props.selected ? "#6161d6" : "#232336";
    }
  }};
  color: ${(props) => (props.light ? "#424286" : "white")};
  width: 244px;
  height: 45px;
  font-size: 16px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakpoints.mobile}) {
    width: 187.5px;
  }
`;

type StyleProp = {
  selected?: boolean;
  light?: boolean;
};

const CoinsAndConverterBtns = () => {
  const { setSelectedBtn, selectedBtn, theme } = useCoin();

  return (
    <BtnsContainer>
      <Link href="/">
        <Btn
          selected={selectedBtn === "Coins"}
          onClick={() => setSelectedBtn("Coins")}
          light={theme === "light"}
        >
          Coins
        </Btn>
      </Link>
      <Link href="/converter">
        <Btn
          selected={selectedBtn === "Converter"}
          onClick={() => setSelectedBtn("Converter")}
          light={theme === "light"}
        >
          Converter
        </Btn>
      </Link>
    </BtnsContainer>
  );
};

export default CoinsAndConverterBtns;
