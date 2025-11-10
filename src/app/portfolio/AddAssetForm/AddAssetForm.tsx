import styled from "styled-components";
import CloseIcon from "../svg/close-circle";
import { SetStateAction, Dispatch, useState } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import { PortfolioCoin } from "types";

const ModalContainer = styled.div<ThemeProp>`
  width: 886px;
  height: 393px;
  background: ${(props) => (props.$light ? "#ced4da" : "#13121a")};
  padding: 48px;
  border-radius: 20px;
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: ${breakpoints.tablet}) {
    width: 768px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 350px;
  }
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
  width: 100%;
  height: 241px;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${breakpoints.tablet}) {
    gap: 20px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const ImageContainer = styled.div<ThemeProp>`
  background: ${(props) => (props.$light ? "white" : "#191932")};
  width: 297px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
`;
const CoinForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 461px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const CancelBtn = styled.button<ThemeProp>`
  width: 222.5px;
  height: 45px;
  background: ${(props) => (props.$light ? "white" : "#232336")};
  border-radius: 6px;
  @media (max-width: ${breakpoints.tablet}) {
    width: 190px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 45%;
  }
`;

const SaveBtn = styled.button<ThemeProp>`
  width: 222.5px;
  height: 45px;
  background: ${(props) => (props.$light ? "#B0B0EB" : "#6161d6")};
  border-radius: 6px;
  @media (max-width: ${breakpoints.tablet}) {
    width: 190px;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 45%;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 164px;
  position: relative;
`;

const Input = styled.input<ThemeProp>`
  width: 100%;
  height: 44px;
  background: ${(props) => (props.$light ? "white" : "#191925")};
`;

const SvgContainer = styled.div`
  cursor: pointer;
`;

const DropDown = styled.div<ThemeProp>`
  width: 200px;
  background: ${(props) => (props.$light ? "white" : "#191925")};
  padding: 10px;
  border-radius: 6px;
  background: ##191925;
  position: absolute;
  top: 45px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const CoinOption = styled.p`
  cursor: pointer;
  &:hover {
    background-color: #0077b6;
  }
`;

const Image = styled.img`
  width: 60%;
`;

const AlertModal = styled.div<ThemeProp>`
  background: ${(props) => (props.$light ? "black" : "white")};
  color: ${(props) => (props.$light ? "white" : "black")};
  width: 325px;
  height: 70px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

type AddAssetFormProps = {
  handleFormClose: () => void;
  purchasedAmountValue: string;
  purchaseDateValue: string;
  setPurchasedAmountValue: Dispatch<SetStateAction<string>>;
  setPurchaseDateValue: Dispatch<SetStateAction<null | string>>;
  portfolioCoins: PortfolioCoin[];
  setPortfolioCoins: Dispatch<SetStateAction<[] | PortfolioCoin[]>>;
  coinSelectValue: string;
  setCoinSelectValue: Dispatch<SetStateAction<string>>;
  isEditOpen: any;
};

type ThemeProp = {
  $light?: boolean;
};

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
  isEditOpen,
}: AddAssetFormProps) => {
  const [nameDropdownOpen, setNameDropdownOpen] = useState(false);
  const [coinImg, setCoinImg] = useState(null);
  const [alertTrue, setAlertTrue] = useState(false);

  const { coins, theme } = useCryptoContext();

  const size = useWindowSize();

  const handleCoinSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoinSelectValue(value);
    if (value.length !== 0) {
      setNameDropdownOpen(true);
    } else {
      setNameDropdownOpen(false);
    }
  };

  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.symbol.includes(coinSelectValue) ||
        coin.name.includes(coinSelectValue) ||
        coin.id.includes(coinSelectValue)
    )
    .slice(0, 10);

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

  const toggleAlert = () => {
    setAlertTrue(true);
    setTimeout(() => setAlertTrue(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const thisCoin = coins.find((coin) => coin.name === coinSelectValue);
    if (
      portfolioCoins.some(
        (coin) => coin.name === coinSelectValue && isEditOpen === false
      )
    ) {
      toggleAlert();
      return;
    }

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

    const filteredCoins = portfolioCoins.filter(
      (coin) => coin.name !== thisCoin.name
    );
    if (isEditOpen) {
      setPortfolioCoins([...filteredCoins, newCoinEntry]);
    } else {
      setPortfolioCoins([...portfolioCoins, newCoinEntry]);
    }

    setCoinSelectValue("");
    setPurchaseDateValue("");
    setPurchasedAmountValue("");
    handleFormClose();
  };

  const selectCoin = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const value = e.currentTarget.textContent;
    setCoinSelectValue(value);
    setNameDropdownOpen(false);
    const thisCoin = coins.find((coin) => {
      if (coin.name === value) {
        return coin;
      }
    });
    setCoinImg(thisCoin.image);
  };

  const today = new Date();

  const twoYearsAgo = new Date(today);
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  return (
    <>
      {alertTrue && (
        <AlertModal $light={theme === "light"}>
          <p>Coin already exists in portfolio!</p>
        </AlertModal>
      )}
      <ModalContainer $light={theme === "light"}>
        <FormHeader>
          <HeaderText>Select Coins</HeaderText>
          <SvgContainer onClick={handleFormClose}>
            <CloseIcon />
          </SvgContainer>
        </FormHeader>
        <InnerContainer>
          {size.width > parseInt(breakpoints.mobile) && (
            <ImageContainer $light={theme === "light"}>
              <Image src={coinImg} />
            </ImageContainer>
          )}

          <CoinForm onSubmit={handleSubmit}>
            <InputsContainer>
              <Input
                type="text"
                value={coinSelectValue}
                onChange={handleCoinSearch}
                autoFocus
                required
                placeholder="Coin Name"
                readOnly={isEditOpen}
                $light={theme === "light"}
              />
              {nameDropdownOpen && (
                <DropDown $light={theme === "light"}>
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
                $light={theme === "light"}
              />
              <Input
                type="date"
                value={purchaseDateValue}
                onChange={handlePurchaseDateInputChange}
                required
                min={twoYearsAgo.toISOString().split("T")[0]}
                max={today.toISOString().split("T")[0]}
                $light={theme === "light"}
              />
            </InputsContainer>
            <BtnContainer>
              <CancelBtn $light={theme === "light"} onClick={handleFormClose}>
                Cancel
              </CancelBtn>
              <SaveBtn $light={theme === "light"} type="submit">
                {size.width > parseInt(breakpoints.mobile) ? (
                  <p>Save and Continue</p>
                ) : (
                  <p>Save</p>
                )}
              </SaveBtn>
            </BtnContainer>
          </CoinForm>
        </InnerContainer>
      </ModalContainer>
    </>
  );
};

export default AddAssetForm;
