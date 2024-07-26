"use client";
import Table from "./components/Table/Table";
import HomePageCharts from "./components/HomePageCharts/HomePageCharts";
import Carousel from "./components/Carousel/Carousel";

export default function Home() {
  return (
    <>
      <Carousel />
      <HomePageCharts />
      <Table />
    </>
  );
}
