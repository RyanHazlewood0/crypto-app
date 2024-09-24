import { SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { breakpoints } from "breakpoints";
import { useCoin } from "@/app/contexts/CoinProvider";

const Container = styled.div<SelectBtnProps>`
  display: flex;
  width: 463px;
  height: 42px;
  justify-content: space-between;
  background: ${(props) => (props.light ? "#a7a7cc" : "#232336")};
  align-items: center;
  border-radius: 6px;
  padding: 4px;
  margin-bottom: 70px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 375px;
    margin-bottom: 82px;
  }
`;

const SelectBtn = styled.div<SelectBtnProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.light ? "#424286" : "white")};
  background: ${(props) => props.selected && "#6161d6"};
  border: ${(props) => {
    if (props.selected) {
      return props.light ? "solid 1px black" : "solid 1px #a7a7cc";
    } else {
      return "none";
    }
  }};
  width: 55px;
  height: 34px;
  border-radius: 6px;
  padding: 20px 8px 20px 8px;
`;

interface ConverterTimeSelectProps {
  timeFrameSelected: string;
  setTimeFrameSelected: Dispatch<SetStateAction<string>>;
  setDayCount: Dispatch<SetStateAction<string>>;
}

type SelectBtnProps = {
  selected?: boolean;
  light?: boolean;
};

const ConverterTimeSelect = ({
  timeFrameSelected,
  setTimeFrameSelected,
  setDayCount,
}: ConverterTimeSelectProps) => {
  const { theme } = useCoin();
  const findDayCount = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.textContent === "1D") {
      setDayCount("1");
      setTimeFrameSelected("1D");
    } else if (e.currentTarget.textContent === "7D") {
      setDayCount("7");
      setTimeFrameSelected("7D");
    } else if (e.currentTarget.textContent === "14D") {
      setDayCount("14");
      setTimeFrameSelected("14D");
    } else if (e.currentTarget.textContent === "1M") {
      setDayCount("30");
      setTimeFrameSelected("1M");
    } else if (e.currentTarget.textContent === "1Q") {
      setDayCount("90");
      setTimeFrameSelected("1Q");
    } else if (e.currentTarget.textContent === "1Y") {
      setDayCount("365");
      setTimeFrameSelected("1Y");
    } else if (e.currentTarget.textContent === "5Y") {
      setDayCount("1825");
      setTimeFrameSelected("5Y");
    }
  };

  return (
    <Container light={theme === "light"}>
      <SelectBtn
        light={theme === "light"}
        onClick={findDayCount}
        selected={timeFrameSelected === "1D"}
      >
        1D
      </SelectBtn>
      <SelectBtn
        light={theme === "light"}
        onClick={findDayCount}
        selected={timeFrameSelected === "7D"}
      >
        7D
      </SelectBtn>
      <SelectBtn
        light={theme === "light"}
        onClick={findDayCount}
        selected={timeFrameSelected === "14D"}
      >
        14D
      </SelectBtn>
      <SelectBtn
        light={theme === "light"}
        onClick={findDayCount}
        selected={timeFrameSelected === "1M"}
      >
        1M
      </SelectBtn>
      <SelectBtn
        light={theme === "light"}
        onClick={findDayCount}
        selected={timeFrameSelected === "1Q"}
      >
        1Q
      </SelectBtn>
      <SelectBtn
        light={theme === "light"}
        onClick={findDayCount}
        selected={timeFrameSelected === "1Y"}
      >
        1Y
      </SelectBtn>
      <SelectBtn
        light={theme === "light"}
        onClick={findDayCount}
        selected={timeFrameSelected === "5Y"}
      >
        5Y
      </SelectBtn>
    </Container>
  );
};

export default ConverterTimeSelect;
