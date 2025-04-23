"use client";
import { useState, Dispatch, SetStateAction } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";

interface WatchListProps {
  setWatchListOpen: Dispatch<SetStateAction<boolean>>;
}

const WatchList = ({ setWatchListOpen }: WatchListProps) => {
  const { theme, watchListCoins } = useCryptoContext();
  const handleCloseWatchList = () => {
    setWatchListOpen(false);
  };

  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-200" : "bg-[#3a3978]"
      } flex flex-col gap-2 rounded-md w-[375px] z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3`}
    >
      <div className="flex text-lg">
        <h1 className="text-lg">Watchlist</h1>
        <p onClick={handleCloseWatchList} className="cursor-pointer ml-auto">
          X
        </p>
      </div>
    </div>
  );
};

export default WatchList;
