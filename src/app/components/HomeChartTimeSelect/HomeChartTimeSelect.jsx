import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  width: 463px;
  height: 42px;
  justify-content: space-between;
  background: #232336;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  padding: 4px;
`;

const SelectBtn = styled.div`
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

const HomeChartTimeSelect = ({ TimeFrameSelected, setTimeFrameSelected }) => {
  const handleClickTimeFrame = (e) => {
    setTimeFrameSelected(e.target.textContent);
  };

  return (
    <Container>
      <SelectBtn
        onClick={handleClickTimeFrame}
        selected={TimeFrameSelected === "1D"}
      >
        1D
      </SelectBtn>
      <SelectBtn
        onClick={handleClickTimeFrame}
        selected={TimeFrameSelected === "7D"}
      >
        7D
      </SelectBtn>
      <SelectBtn
        onClick={handleClickTimeFrame}
        selected={TimeFrameSelected === "14D"}
      >
        14D
      </SelectBtn>
      <SelectBtn
        onClick={handleClickTimeFrame}
        selected={TimeFrameSelected === "1M"}
      >
        1M
      </SelectBtn>
      <SelectBtn
        onClick={handleClickTimeFrame}
        selected={TimeFrameSelected === "1Q"}
      >
        1Q
      </SelectBtn>
      <SelectBtn
        onClick={handleClickTimeFrame}
        selected={TimeFrameSelected === "1Y"}
      >
        1Y
      </SelectBtn>
      <SelectBtn
        onClick={handleClickTimeFrame}
        selected={TimeFrameSelected === "5Y"}
      >
        5Y
      </SelectBtn>
    </Container>
  );
};

HomeChartTimeSelect.propTypes = {
  TimeFrameSelected: PropTypes.string,
  setTimeFrameSelected: PropTypes.func,
};

export default HomeChartTimeSelect;
