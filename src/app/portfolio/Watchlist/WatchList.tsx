"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import CloseIcon from "../svg/close-circle";
import Link from "next/link";

interface WatchListProps {
  setWatchListOpen: Dispatch<SetStateAction<boolean>>;
}

const sortingOptions = ["Highest Market Cap", "Highest 24 Hour Volume"];

const WatchList = ({ setWatchListOpen }: WatchListProps) => {
  const [sortOrder, setSortOrder] = useState("Highest Market Cap");
  const { theme, watchListCoins, setWatchListCoins } = useCryptoContext();
  const handleCloseWatchList = () => {
    setWatchListOpen(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleRemoveItem = (id) => {
    const updatedList = watchListCoins.filter((coin) => coin.id !== id);
    setWatchListCoins(updatedList);
    localStorage.setItem("testJSON", JSON.stringify(updatedList));
  };

  const sortedCoins = [...watchListCoins].sort((a, b) => {
    if (sortOrder === "Highest 24 Hour Volume") {
      return b.total_volume - a.total_volume;
    } else if (sortOrder === "Highest Market Cap") {
      return b.market_cap - a.market_cap;
    }
  });

  return (
    <ul
      className={`${
        theme === "light" ? "bg-gray-200" : "bg-[#3a3978]"
      } flex flex-col gap-3 rounded-md w-[375px] z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 border border-black`}
    >
      <div className="flex text-lg">
        <h1 className="text-lg">Watchlist</h1>
        <div className="cursor-pointer ml-auto" onClick={handleCloseWatchList}>
          <CloseIcon />
        </div>
      </div>
      <div className="flex gap-2">
        <h2 className="text-lg">Sort by:</h2>
        <select
          className={`p-1 rounded-md border ${
            theme === "light"
              ? "text-black border-black bg-white"
              : "text-white border-white bg-[#5e60ce]"
          }`}
          onChange={handleSortChange}
          value={sortOrder}
        >
          {sortingOptions.map((sortOption) => (
            <option key={sortOption}>{sortOption}</option>
          ))}
        </select>
      </div>
      {sortedCoins.length > 0 &&
        sortedCoins.map((coin) => (
          <li key={coin.id} className="flex justify-between">
            <Link key={coin.id} href={`/coin/${coin.id}`}>
              <div className="flex gap-3">
                <div>
                  <img src={coin.image} className="w-[32px]" />
                </div>
                <div>{coin.name}</div>
                <div>({coin.symbol.toUpperCase()})</div>
              </div>
            </Link>
            <button
              onClick={() => handleRemoveItem(coin.id)}
              className={`border p-1 rounded-md ${
                theme === "light"
                  ? "text-black border-black"
                  : "text-white border-white"
              }`}
            >
              Remove
            </button>
          </li>
        ))}
    </ul>
  );
};

export default WatchList;
