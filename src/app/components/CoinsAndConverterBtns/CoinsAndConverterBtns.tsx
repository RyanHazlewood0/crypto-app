import styled from "styled-components";
import Link from "next/link";
import { useCoin } from "@/app/contexts/CoinProvider";

const BtnsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const Btn = styled.div<StyleProp>`
  background: ${(props) => (props.selected ? "#6161d6" : "#232336")};
  color: white;
  width: 244px;
  height: 45px;
  font-size: 16px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type StyleProp = {
  selected: boolean;
};

const CoinsAndConverterBtns = () => {
  const { setSelectedBtn, selectedBtn } = useCoin();

  return (
    <BtnsContainer>
      <Link href="/">
        <Btn
          selected={selectedBtn === "Coins"}
          onClick={() => setSelectedBtn("Coins")}
        >
          Coins
        </Btn>
      </Link>
      <Link href="/convertor">
        <Btn
          selected={selectedBtn === "Converter"}
          onClick={() => setSelectedBtn("Converter")}
        >
          Converter
        </Btn>
      </Link>
    </BtnsContainer>
  );
};

export default CoinsAndConverterBtns;
