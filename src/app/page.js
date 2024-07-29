"use client";

import Table from "./components/Table/Table";
import HomePageCharts from "./components/HomePageCharts/HomePageCharts";
import Carousel from "./components/Carousel/Carousel";
import { useState } from "react";

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState(null);

  return (
    <>
      <Carousel setSelectedCoin={setSelectedCoin} selectedCoin={selectedCoin} />
      <HomePageCharts selectedCoin={selectedCoin} />
      <Table />
    </>
  );
}
