"use client";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CoinPageObject } from "types";
import CloseIcon from "@/app/portfolio/svg/close-circle";

type TopHolderProps = {
  setTopHoldersClicked: Dispatch<SetStateAction<boolean>>;
  thisCoinData: CoinPageObject;
};

const TopHolders = ({ setTopHoldersClicked, thisCoinData }: TopHolderProps) => {
  const { theme } = useCryptoContext();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [holderData, setHolderData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://pro-api.coingecko.com/api/v3/onchain/networks/${thisCoinData.name}/tokens/${thisCoinData.asset_platform_id}/top_holders?holders=3`,
        {
          headers: {
            "x-cg-pro-api-key": apiKey,
          },
        },
      );
      const data = await response.json();
      setHolderData(data);
    };
    fetchData();
  }, []);

  return (
    <ul
      className={`${
        theme === "light" ? "bg-gray-200" : "bg-[#3a3978]"
      } flex flex-col gap-3 rounded-md w-[375px] z-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 border border-black`}
    >
      <div className={"flex justify-between"}>
        <p>Top 3 {thisCoinData.name} Holders</p>
        <button onClick={() => setTopHoldersClicked(false)} className="ml-auto">
          <CloseIcon />
        </button>
      </div>
      <li>list item</li>
    </ul>
  );
};

export default TopHolders;
