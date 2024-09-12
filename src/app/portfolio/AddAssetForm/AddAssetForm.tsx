import styled from "styled-components";
import CloseIcon from "../svg/close-circle";
import { SetStateAction, Dispatch, useState } from "react";
import { CoinTypes } from "types";

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
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  background: #191925;
`;

const SvgContainer = styled.div`
  cursor: pointer;
`;

const DropDown = styled.div`
  width: 200px;
  background: #191925;
  padding: 10px;
  border-radius: 6px;
  background: ##191925;
  position: absolute;
  top: 45px;
`;

const CoinOption = styled.p`
  cursor: pointer;
  &:hover {
    background-color: #0077b6;
  }
`;

interface AddAssetFormProps {
  handleFormClose: () => void;
  purchasedAmountValue: string;
  purchaseDateValue: string;
  setPurchasedAmountValue: Dispatch<SetStateAction<string>>;
  setPurchaseDateValue: Dispatch<SetStateAction<null | string>>;
  portfolioCoins: PortfolioCoin[];
  setPortfolioCoins: Dispatch<SetStateAction<[] | PortfolioCoin[]>>;
  coinSelectValue: string;
  setCoinSelectValue: Dispatch<SetStateAction<string>>;
  coinsData: CoinTypes[];
}

export interface PortfolioCoin {
  name: string;
  totalAmount: number;
  purchaseDate: Date;
  currentPrice: number;
  totalValue: number;
  image: string;
  circulating_supply: number;
  total_supply: number;
  total_volume: number;
  market_cap: number;
  priceChange24h: number;
  symbol: string;
  id: string;
}

const AddAssetForm = ({
  handleFormClose,
  purchasedAmountValue,
  purchaseDateValue,
  coinSelectValue,
  setCoinSelectValue,
  setPurchasedAmountValue,
  setPurchaseDateValue,
  portfolioCoins,
  setPortfolioCoins,
  coinsData,
}: AddAssetFormProps) => {
  const [nameDropdownOpen, setNameDropdownOpen] = useState(false);

  const handleCoinSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoinSelectValue(value);
    if (value.length !== 0) {
      setNameDropdownOpen(true);
    } else {
      setNameDropdownOpen(false);
    }
  };

  const filteredCoins = coinsData.filter(
    (coin) =>
      coin.symbol.includes(coinSelectValue) ||
      coin.name.includes(coinSelectValue) ||
      coin.id.includes(coinSelectValue)
  );

  const handlePurchaseAmountInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPurchasedAmountValue(value);
  };

  const handlePurchaseDateInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPurchaseDateValue(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const thisCoin = coinsData.find((coin) => coin.name === coinSelectValue);
    const newCoinsList = portfolioCoins.filter((coin) => {
      return coin.name !== thisCoin.name;
    });

    const logo = thisCoin.image;
    const buyDate = new Date(purchaseDateValue);
    const newCoinEntry: PortfolioCoin = {
      name: coinSelectValue,
      totalAmount: Number(purchasedAmountValue),
      purchaseDate: buyDate,
      currentPrice: thisCoin.current_price,
      totalValue: thisCoin.current_price * Number(purchasedAmountValue),
      image: logo,
      circulating_supply: thisCoin.circulating_supply,
      total_volume: thisCoin.total_volume,
      market_cap: thisCoin.market_cap,
      total_supply: thisCoin.total_supply,
      priceChange24h: thisCoin.price_change_percentage_24h_in_currency,
      symbol: thisCoin.symbol,
      id: thisCoin.id,
    };
    setPortfolioCoins([...newCoinsList, newCoinEntry]);
    setCoinSelectValue("");
    setPurchaseDateValue("");
    setPurchasedAmountValue("");
    handleFormClose();
  };

  const selectCoin = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const value = e.currentTarget.textContent;
    setCoinSelectValue(value);
    setNameDropdownOpen(false);
  };

  const today = new Date();

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
          <CoinForm onSubmit={handleSubmit}>
            <InputsContainer>
              <Input
                type="text"
                value={coinSelectValue}
                onChange={handleCoinSearch}
                autoFocus
                required
                placeholder="Coin Name"
              />
              {nameDropdownOpen && (
                <DropDown>
                  {filteredCoins.map((coin) => (
                    <CoinOption key={coin.id} onClick={selectCoin}>
                      {coin.name}
                    </CoinOption>
                  ))}
                </DropDown>
              )}
              <Input
                type="number"
                value={purchasedAmountValue}
                onChange={handlePurchaseAmountInputChange}
                required
                placeholder="Coin Amount"
              />
              <Input
                type="date"
                value={purchaseDateValue}
                onChange={handlePurchaseDateInputChange}
                required
                max={today.toISOString().split("T")[0]}
              />
            </InputsContainer>
            <BtnContainer>
              <CancelBtn onClick={handleFormClose}>Cancel</CancelBtn>
              <SaveBtn type="submit">Save and Continue</SaveBtn>
            </BtnContainer>
          </CoinForm>
        </InnerContainer>
      </ModalContainer>
    </>
  );
};

export default AddAssetForm;
