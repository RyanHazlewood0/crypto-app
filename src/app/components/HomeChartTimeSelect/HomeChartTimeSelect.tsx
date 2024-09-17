import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { breakpoints } from "breakpoints";

const Container = styled.div`
  display: flex;
  width: 463px;
  height: 42px;
  justify-content: space-between;
  background: #232336;
  align-items: center;
  border-radius: 6px;
  padding: 4px;
  margin-bottom: 70px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 375px;
    margin-bottom: 20px;
  }
`;

const SelectBtn = styled.div<StyleProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #a7a7cc;
  background: ${(props) => (props.selected ? "#6161d6" : "#232336")};
  border: ${(props) => (props.selected ? "solid 1px #a7a7cc" : "none")};
  width: 55px;
  height: 34px;
  border-radius: 6px;
  padding: 20px 8px 20px 8px;
`;

type StyleProp = {
  selected: boolean;
};

type HomeChartTimeSelectProps = {
  timeFrameSelected: string;
  setTimeFrameSelected: Dispatch<SetStateAction<string>>;
  setDayCount: Dispatch<SetStateAction<string>>;
};

const HomeChartTimeSelect = ({
  timeFrameSelected,
  setTimeFrameSelected,
  setDayCount,
}: HomeChartTimeSelectProps) => {
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
    <Container>
      <SelectBtn onClick={findDayCount} selected={timeFrameSelected === "1D"}>
        1D
      </SelectBtn>
      <SelectBtn onClick={findDayCount} selected={timeFrameSelected === "7D"}>
        7D
      </SelectBtn>
      <SelectBtn onClick={findDayCount} selected={timeFrameSelected === "14D"}>
        14D
      </SelectBtn>
      <SelectBtn onClick={findDayCount} selected={timeFrameSelected === "1M"}>
        1M
      </SelectBtn>
      <SelectBtn onClick={findDayCount} selected={timeFrameSelected === "1Q"}>
        1Q
      </SelectBtn>
      <SelectBtn onClick={findDayCount} selected={timeFrameSelected === "1Y"}>
        1Y
      </SelectBtn>
      <SelectBtn onClick={findDayCount} selected={timeFrameSelected === "5Y"}>
        5Y
      </SelectBtn>
    </Container>
  );
};

export default HomeChartTimeSelect;
