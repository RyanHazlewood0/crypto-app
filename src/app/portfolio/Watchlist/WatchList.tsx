"use client";
import { Dispatch, SetStateAction } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import CloseIcon from "../svg/close-circle";
import Link from "next/link";

interface WatchListProps {
  setWatchListOpen: Dispatch<SetStateAction<boolean>>;
}

const WatchList = ({ setWatchListOpen }: WatchListProps) => {
  const { theme, watchListCoins } = useCryptoContext();
  const handleCloseWatchList = () => {
    setWatchListOpen(false);
  };

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

      {watchListCoins.length > 0 &&
        watchListCoins.map((coin) => (
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
