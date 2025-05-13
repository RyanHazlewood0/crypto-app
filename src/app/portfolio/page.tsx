"use client";
import { useState, useEffect } from "react";
import AddAssetForm from "./AddAssetForm/AddAssetForm";
import CoinEntry from "./CoinEntry/CoinEntry";
import { PortfolioCoin } from "types";
import MobileButtons from "../components/MobileButtons/MobileButtons";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import InvestmentCalc from "./InvestmentCalc/InvestmentCalc";
import WatchList from "./Watchlist/WatchList";
import PercentageBreakdown from "./PercentageBreakdown/PercentageBreakdown";

export default function Portfolio() {
  const [portfolioCoins, setPortfolioCoins] = useState<PortfolioCoin[] | []>(
    []
  );
  const [assetFormOpen, setAssetFormOpen] = useState(false);
  const [coinSelectValue, setCoinSelectValue] = useState("");
  const [purchasedAmountValue, setPurchasedAmountValue] = useState<string>("");
  const [purchaseDateValue, setPurchaseDateValue] = useState<null | string>(
    null
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [calcModalOpen, setCalcMocalOpen] = useState(false);
  const [watchListOpen, setWatchlistOpen] = useState(false);

  const { setSelectedMobileBtn, setSelectedNavLink, coins, theme } =
    useCryptoContext();

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

  const handleAssetFormOpen = () => {
    setAssetFormOpen(true);
  };

  const handleFormClose = () => {
    setAssetFormOpen(false);
    setCoinSelectValue("");
    setPurchaseDateValue(null);
    setPurchasedAmountValue(null);
    setIsEditOpen(false);
  };

  const handleCalcModalOpen = () => {
    setCalcMocalOpen(true);
  };

  const handleWatchListOpen = () => {
    setWatchlistOpen(true);
  };

  const editCoinEntry = (
    e: React.MouseEvent<HTMLButtonElement>,
    coin: PortfolioCoin
  ) => {
    setAssetFormOpen(true);
    setCoinSelectValue(coin.name);
    setPurchaseDateValue(coin.purchaseDate.toISOString().split("T")[0]);
    setPurchasedAmountValue(coin.totalAmount.toString());
    setIsEditOpen(true);
  };

  const sortedPortfolioCoins: [] | PortfolioCoin[] = [...portfolioCoins].sort(
    (a, b) => b.totalValue - a.totalValue
  );

  if (coins.length < 1) {
    return <p className="text-[35px] text-center">Loading coin database...</p>;
  }

  return (
    <>
      {size.width > parseInt(breakpoints.mobile) && (
        <div className="w-full h-[45px] flex justify-between mb-[25px]">
          <h1 className="text-[20px]">Portfolio</h1>
          <div className="gap-[15px] flex">
            {size.width > parseInt(breakpoints.mobile) && (
              <>
                <button
                  className={`${
                    theme === "light" ? "bg-[#B0B0EB]" : "bg-[#6161d6]"
                  } h-full w-[244px] rounded-[6px]`}
                  onClick={handleAssetFormOpen}
                  disabled={calcModalOpen ? true : false}
                >
                  Add Asset
                </button>
                <button
                  className={`${
                    theme === "light" ? "bg-[#B0B0EB]" : "bg-[#6161d6]"
                  } h-full w-[244px] rounded-[6px]`}
                  onClick={handleCalcModalOpen}
                  disabled={assetFormOpen ? true : false}
                >
                  Investment Calculator (DCA)
                </button>
                <button
                  className={`${
                    theme === "light" ? "bg-[#B0B0EB]" : "bg-[#6161d6]"
                  } h-full w-[244px] rounded-[6px]`}
                  onClick={handleWatchListOpen}
                >
                  Watchlist
                </button>
                {watchListOpen && (
                  <>
                    <WatchList setWatchListOpen={setWatchlistOpen} />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {portfolioCoins.length < 1 && (
        <p className="text-[35px] text-center">No coins added yet</p>
      )}
      {size.width > parseInt(breakpoints.mobile) ? (
        <div className="flex flex-col gap-[25px] mb-[25px]">
          {portfolioCoins.length > 0 && (
            <PercentageBreakdown portfolioCoins={portfolioCoins} />
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
        </div>
      ) : (
        <div className="flex flex-col gap-[16px] mb-[65px]">
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
        </div>
      )}

      {assetFormOpen && (
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
      {watchListOpen && <WatchList setWatchListOpen={setWatchlistOpen} />}
      {calcModalOpen && <InvestmentCalc setCalcMocalOpen={setCalcMocalOpen} />}
      {size.width < parseInt(breakpoints.mobile) &&
        !assetFormOpen &&
        !calcModalOpen &&
        !watchListOpen && (
          <div className="flex">
            <button
              onClick={handleCalcModalOpen}
              disabled={assetFormOpen ? true : false}
              className={`${
                theme === "light" ? "bg-[#B0B0EB]" : "bg-[#6161d6]"
              } h-[56px] w-[56px] rounded-[50%] fixed z-[1] bottom-[75px] text-[18px] left-[10px]`}
            >
              DCA
            </button>

            <button
              className={`${
                theme === "light" ? "bg-[#B0B0EB]" : "bg-[#6161d6]"
              } w-[56px] h-[56px] rounded-[50%] fixed z-[1] bottom-[75px] text-[30px] right-[10px]`}
              onClick={handleAssetFormOpen}
            >
              +
            </button>
            <button
              className={`${
                theme === "light" ? "bg-[#B0B0EB]" : "bg-[#6161d6]"
              } w-[56px] h-[56px] rounded-[50%] fixed z-[1] bottom-[75px] text-[18px] left-[70px] `}
              onClick={handleWatchListOpen}
            >
              List
            </button>
            <MobileButtons />
          </div>
        )}
    </>
  );
}
