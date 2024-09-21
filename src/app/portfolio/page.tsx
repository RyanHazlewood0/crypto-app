"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import AddAssetForm from "./AddAssetForm/AddAssetForm";
import CoinEntry from "./CoinEntry/CoinEntry";
import { PortfolioCoin } from "./AddAssetForm/AddAssetForm";
import MobileButtons from "../components/MobileButtons/MobileButtons";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import { useCoin } from "../contexts/CoinProvider";

const HeaderContainer = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const HeaderText = styled.h1`
  font-size: 20px;
`;

const AddBtn = styled.button`
  width: 244px;
  height: 100%;
  border-radius: 6px;
  background: #6161d6;
`;

const MobileAddBtn = styled.button`
  width: 56px;
  height: 56px;
  background: #6161d6;
  border-radius: 50%;
  position: fixed;
  z-index: 1;
  bottom: 75px;
  font-size: 30px;
  right: 10px;
`;

const NoCoinsMessage = styled.p`
  font-size: 35px;
  text-align: center;
`;

const LoadingText = styled.p`
  font-size: 35px;
  text-align: center;
`;

export default function Portfolio() {
  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioCoin[] | []>(
    []
  );
  const [formOpen, setFormOpen] = useState(false);
  const [coinSelectValue, setCoinSelectValue] = useState("");
  const [purchasedAmountValue, setPurchasedAmountValue] = useState<string>("");
  const [purchaseDateValue, setPurchaseDateValue] = useState<null | string>(
    null
  );
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { setSelectedMobileBtn, setSelectedNavLink, coins } = useCoin();

  const size = useWindowSize();

  let fixedDates: PortfolioCoin[];
  if (typeof window !== "undefined") {
    const storedCoins: PortfolioCoin[] =
      JSON.parse(localStorage.getItem("portCoins")) || [];
    fixedDates = storedCoins.map((el) => {
      return { ...el, purchaseDate: new Date(el.purchaseDate) };
    });
  }

  useEffect(() => {
    setSelectedMobileBtn("Portfolio");
    setSelectedNavLink("Portfolio");
  }, []);

  useEffect(() => {
    if (fixedDates) {
      setPortfolioCoins(fixedDates);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("portCoins", JSON.stringify(portfolioCoins));
    }
  }, [portfolioCoins]);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setCoinSelectValue("");
    setPurchaseDateValue(null);
    setPurchasedAmountValue(null);
    setIsEditOpen(false);
  };

  const editCoinEntry = (
    e: React.MouseEvent<HTMLButtonElement>,
    coin: PortfolioCoin
  ) => {
    setFormOpen(true);
    setCoinSelectValue(coin.name);
    setPurchaseDateValue(coin.purchaseDate.toISOString().split("T")[0]);
    setPurchasedAmountValue(coin.totalAmount.toString());
    setIsEditOpen(true);
  };

  const sortedPortfolioCoins: [] | PortfolioCoin[] = [...portfolioCoins].sort(
    (a, b) => b.totalValue - a.totalValue
  );

  if (coins.length < 1) {
    return <LoadingText>Loading coin data</LoadingText>;
  }

  return (
    <>
      {size.width > parseInt(breakpoints.mobile) && (
        <HeaderContainer>
          <HeaderText>Portfolio</HeaderText>
          <AddBtn onClick={handleFormOpen}>Add Asset</AddBtn>
        </HeaderContainer>
      )}
      {portfolioCoins.length < 1 && (
        <NoCoinsMessage>No coins added yet</NoCoinsMessage>
      )}
      {sortedPortfolioCoins &&
        sortedPortfolioCoins.map((coin: PortfolioCoin) => (
          <CoinEntry
            coin={coin}
            key={coin.name}
            portfolioCoins={portfolioCoins}
            setPortfolioCoins={setPortfolioCoins}
            editCoinEntry={editCoinEntry}
            isEditOpen={isEditOpen}
          />
        ))}
      {formOpen && (
        <AddAssetForm
          handleFormClose={handleFormClose}
          purchasedAmountValue={purchasedAmountValue}
          purchaseDateValue={purchaseDateValue}
          setPurchasedAmountValue={setPurchasedAmountValue}
          setPurchaseDateValue={setPurchaseDateValue}
          setPortfolioCoins={setPortfolioCoins}
          portfolioCoins={portfolioCoins}
          coinSelectValue={coinSelectValue}
          setCoinSelectValue={setCoinSelectValue}
          isEditOpen={isEditOpen}
        />
      )}
      {size.width < parseInt(breakpoints.mobile) && (
        <>
          <MobileAddBtn onClick={handleFormOpen}>+</MobileAddBtn>
          <MobileButtons />
        </>
      )}
    </>
  );
}
