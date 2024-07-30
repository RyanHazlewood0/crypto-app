"use client";

import Table from "./components/Table/Table";
import HomePageCharts from "./components/HomePageCharts/HomePageCharts";
import Carousel from "./components/Carousel/Carousel";
import HomeChartTimeSelect from "./components/HomeChartTimeSelect/HomeChartTimeSelect";
import { useState } from "react";

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [timeFrameSelected, setTimeFrameSelected] = useState("1M");
  const [dayCount, setDayCount] = useState("30");
  return (
    <>
      <Carousel setSelectedCoin={setSelectedCoin} selectedCoin={selectedCoin} />
      <HomePageCharts selectedCoin={selectedCoin} dayCount={dayCount} />
      <HomeChartTimeSelect
        timeFrameSelected={timeFrameSelected}
        setTimeFrameSelected={setTimeFrameSelected}
        setDayCount={setDayCount}
      />
      <Table />
    </>
  );
}
