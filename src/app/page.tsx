"use client";

import Table from "./components/Table/Table";
import HomePageCharts from "./components/HomePageCharts/HomePageCharts";
import Carousel from "./components/Carousel/Carousel";
import HomeChartTimeSelect from "./components/HomeChartTimeSelect/HomeChartTimeSelect";
import CoinsAndConverterBtns from "./components/CoinsAndConverterBtns/CoinsAndConverterBtns";
import Converter from "./components/converter/page";
import { useState } from "react";
import { Coin } from "types";
import MobileButtons from "./components/MobileButtons/MobileButtons";
import useWindowSize from "windowSizeHook";
import { breakpoints } from "breakpoints";
import { useCoin } from "./contexts/CoinProvider";

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [timeFrameSelected, setTimeFrameSelected] = useState("1M");
  const [dayCount, setDayCount] = useState("30");
  const { selectedBtn, selectedMobileBtn, setSelectedNavLink } = useCoin();
  const size = useWindowSize();

  if (selectedMobileBtn !== "Portfolio") {
    setSelectedNavLink("Home");
  }

  return (
    <>
      {size.width > parseInt(breakpoints.mobile) && <CoinsAndConverterBtns />}
      {selectedBtn === "Coins" && size.width > parseInt(breakpoints.mobile) && (
        <>
          <Carousel
            setSelectedCoin={setSelectedCoin}
            selectedCoin={selectedCoin}
          />
          <HomePageCharts selectedCoin={selectedCoin} dayCount={dayCount} />
          <HomeChartTimeSelect
            timeFrameSelected={timeFrameSelected}
            setTimeFrameSelected={setTimeFrameSelected}
            setDayCount={setDayCount}
          />
        </>
      )}
      {selectedMobileBtn === "Overview" &&
        size.width < parseInt(breakpoints.mobile) && (
          <>
            <Carousel
              setSelectedCoin={setSelectedCoin}
              selectedCoin={selectedCoin}
            />
            <HomePageCharts selectedCoin={selectedCoin} dayCount={dayCount} />
            <HomeChartTimeSelect
              timeFrameSelected={timeFrameSelected}
              setTimeFrameSelected={setTimeFrameSelected}
              setDayCount={setDayCount}
            />
          </>
        )}
      {selectedBtn === "Converter" &&
        size.width > parseInt(breakpoints.mobile) && (
          <>
            <Converter />
          </>
        )}
      {selectedMobileBtn === "Converter" &&
        size.width < parseInt(breakpoints.mobile) && (
          <>
            <Converter />
          </>
        )}
      <Table />
      <MobileButtons />
    </>
  );
}
