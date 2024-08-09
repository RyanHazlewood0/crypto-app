import PropTypes from "prop-types";
import styled from "styled-components";
import CloseIcon from "./close-circle";

const ModalContainer = styled.div`
  width: 886px;
  height: 393px;
  background: #13121a;
  padding: 48px;
  border-radius: 20px;
`;

const FormHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const HeaderText = styled.h1`
  font-size: 20px;
`;

const InnerContainer = styled.div`
  width: 790px;
  height: 241px;
  display: flex;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  background: #191932;
  width: 297px;
  border-radius: 8px;
`;
const CoinForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 461px;
`;
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CancelBtn = styled.button`
  width: 222.5px;
  height: 45px;
  background: #232336;
  border-radius: 6px;
`;

const SaveBtn = styled.button`
  width: 222.5px;
  height: 45px;
  background: #6161d6;
  border-radius: 6px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 164px;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  background: #191925;
`;

const SvgContainer = styled.div`
  cursor: pointer;
`;

const AddAssetForm = ({
  handleFormClose,
  CoinSelectValue,
  purchasedAmountValue,
  purchaseDateValue,
  handleCoinSelectInputChange,
  handlePurchaseAmountInputChange,
  handlePurchaseDateInputChange,
  handleSubmit,
}) => {
  return (
    <>
      <ModalContainer>
        <FormHeader>
          <HeaderText>Select Coins</HeaderText>
          <SvgContainer onClick={handleFormClose}>
            <CloseIcon />
          </SvgContainer>
        </FormHeader>
        <InnerContainer>
          <ImageContainer>image</ImageContainer>
          <CoinForm>
            <InputsContainer>
              <Input
                type="text"
                value={CoinSelectValue}
                onChange={(e) => handleCoinSelectInputChange(e)}
              />
              <Input
                type="text"
                value={purchasedAmountValue}
                onChange={(e) => handlePurchaseAmountInputChange(e)}
              />
              <Input
                type="text"
                value={purchaseDateValue}
                onChange={(e) => handlePurchaseDateInputChange(e)}
              />
            </InputsContainer>
            <BtnContainer>
              <CancelBtn onClick={handleFormClose}>Cancel</CancelBtn>
              <SaveBtn type="submit" onSubmit={(e) => handleSubmit(e)}>
                Save and Continue
              </SaveBtn>
            </BtnContainer>
          </CoinForm>
        </InnerContainer>
      </ModalContainer>
    </>
  );
};

export default AddAssetForm;

AddAssetForm.propTypes = {
  handleFormClose: PropTypes.function,
  CoinSelectValue: PropTypes.function,
  purchasedAmountValue: PropTypes.function,
  purchaseDateValue: PropTypes.function,
  handleCoinSelectInputChange: PropTypes.function,
  handlePurchaseAmountInputChange: PropTypes.function,
  handlePurchaseDateInputChange: PropTypes.function,
  handleSubmit: PropTypes.function,
};
