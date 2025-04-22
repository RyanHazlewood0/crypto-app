"use client";
import Link from "next/link";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { SetStateAction, Dispatch, useEffect, useState } from "react";

interface TrendingProps {
  setTrendingModalOpen: Dispatch<SetStateAction<boolean>>;
}

const TrendingModal = ({ setTrendingModalOpen }: TrendingProps) => {
  const [trendingCoins, setTrendingCoins] = useState([]);

  const { theme } = useCryptoContext();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const closeModal = () => {
    setTrendingModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://pro-api.coingecko.com/api/v3/search/trending",
        {
          headers: {
            "x-cg-pro-api-key": apiKey,
          },
        }
      );
      const data = await response.json();
      setTrendingCoins(data.coins.slice(0, 5));
    };
    fetchData();
  }, []);

  return (
    <ul
      className={`${
        theme === "light" ? "bg-white" : "bg-[#3a3978]"
      } flex flex-col gap-2 rounded-md w-[375px] z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3`}
    >
      <div className="flex">
        <p>Top 5 trending 24H:</p>
        <button onClick={closeModal} className="ml-auto">
          X
        </button>
      </div>
      {trendingCoins.length > 1 &&
        trendingCoins.map((coin) => (
          <Link key={coin.item.id} href={`/coin/${coin.item.id}`}>
            <li className="flex gap-3">
              <img src={coin.item.thumb} className="w-[32px]" />
              <p>{coin.item.name}</p>
              <p>({coin.item.symbol})</p>
            </li>
          </Link>
        ))}
    </ul>
  );
};

export default TrendingModal;
