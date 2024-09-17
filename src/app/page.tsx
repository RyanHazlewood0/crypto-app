"use client";

import Table from "./components/Table/Table";
import HomePageCharts from "./components/HomePageCharts/HomePageCharts";
import Carousel from "./components/Carousel/Carousel";
import HomeChartTimeSelect from "./components/HomeChartTimeSelect/HomeChartTimeSelect";
import CoinsAndConverterBtns from "./components/CoinsAndConverterBtns/CoinsAndConverterBtns";
import { useState } from "react";
import { CoinTypes } from "types";
import MobileButtons from "./components/MobileButtons/MobileButtons";

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState<CoinTypes | null>(null);
  const [timeFrameSelected, setTimeFrameSelected] = useState("1M");
  const [dayCount, setDayCount] = useState("30");

  return (
    <>
      <CoinsAndConverterBtns />
      <Carousel setSelectedCoin={setSelectedCoin} selectedCoin={selectedCoin} />
      <HomePageCharts selectedCoin={selectedCoin} dayCount={dayCount} />
      <HomeChartTimeSelect
        timeFrameSelected={timeFrameSelected}
        setTimeFrameSelected={setTimeFrameSelected}
        setDayCount={setDayCount}
      />
      <Table />
      <MobileButtons />
    </>
  );
}
