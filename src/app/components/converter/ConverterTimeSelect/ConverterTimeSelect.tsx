import { SetStateAction, Dispatch } from "react";
import styled from "styled-components";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";

const SelectBtn = styled.div<SelectBtnProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.$light ? "#424286" : "#a7a7cc")};
  background: ${(props) => {
    if (props.$selected) {
      if (props.$light) {
        return "#CCCCFA";
      } else {
        return "#6262d6";
      }
    }
  }};
  border: ${(props) => {
    if (props.$selected) {
      if (props.$light) {
        return "solid 1px #232336";
      } else {
        return "solid 1px #a7a7cc";
      }
    }
  }};
  width: 55px;
  height: 34px;
  border-radius: 6px;
  padding: 20px 8px 20px 8px;
`;

type ConverterTimeSelectProps = {
  timeFrameSelected: string;
  setTimeFrameSelected: Dispatch<SetStateAction<string>>;
  setDayCount: Dispatch<SetStateAction<string>>;
};

type SelectBtnProps = {
  $selected?: boolean;
  $light?: boolean;
};

const ConverterTimeSelect = ({
  timeFrameSelected,
  setTimeFrameSelected,
  setDayCount,
}: ConverterTimeSelectProps) => {
  const { theme } = useCryptoContext();
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
    }
  };

  return (
    <div
      className={`flex justify-between items-center rounded-lg p-1 w-full md:w-1/2 lg:w-[35%] mb-10 ${
        theme === "light" ? "bg-white" : "bg-[#232336]"
      }`}
    >
      <SelectBtn
        $light={theme === "light"}
        onClick={findDayCount}
        $selected={timeFrameSelected === "1D"}
      >
        1D
      </SelectBtn>
      <SelectBtn
        $light={theme === "light"}
        onClick={findDayCount}
        $selected={timeFrameSelected === "7D"}
      >
        7D
      </SelectBtn>
      <SelectBtn
        $light={theme === "light"}
        onClick={findDayCount}
        $selected={timeFrameSelected === "14D"}
      >
        14D
      </SelectBtn>
      <SelectBtn
        $light={theme === "light"}
        onClick={findDayCount}
        $selected={timeFrameSelected === "1M"}
      >
        1M
      </SelectBtn>
      <SelectBtn
        $light={theme === "light"}
        onClick={findDayCount}
        $selected={timeFrameSelected === "1Q"}
      >
        1Q
      </SelectBtn>
      <SelectBtn
        $light={theme === "light"}
        onClick={findDayCount}
        $selected={timeFrameSelected === "1Y"}
      >
        1Y
      </SelectBtn>
    </div>
  );
};

export default ConverterTimeSelect;
