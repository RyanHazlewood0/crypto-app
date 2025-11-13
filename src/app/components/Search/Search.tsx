"use client";
import { useState } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { useRouter } from "next/navigation";
import { Coin } from "types";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { coins, theme } = useCryptoContext();
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value.length !== 0) {
      setDropDownOpen(true);
    } else {
      setDropDownOpen(false);
    }
  };

  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.id.includes(searchValue) ||
        coin.symbol.includes(searchValue) ||
        coin.name.includes(searchValue)
    )
    .slice(0, 10);

  const handleBlur = () => {
    setDropDownOpen(false);
  };

  const handleNavLink = (coin: Coin) => {
    router.push(`/coin/${coin.id}`);
    setSearchValue("");
  };

  return (
    <div className={"w-full"} onBlur={handleBlur}>
      <input
        value={searchValue}
        onChange={handleSearch}
        className={`w-[168px] h-9 md:h-11 rounded-md border border-solid border-gray-500 ${
          theme === "light" ? "bg-[#CCCCFA]" : "bg-[#191925]"
        }`}
      />
      {dropDownOpen && (
        <div
          className={`mt-1.5 w-full p-2.5 rounded-md absolute ${
            theme === "light" ? "bg-[#CCCCFA]" : "bg-[#191925]"
          }`}
        >
          {filteredCoins.map((coin) => (
            <div
              key={coin.id}
              onMouseDown={() => handleNavLink(coin)}
              className={"hover:bg-blue-700"}
            >
              <p style={{ cursor: "pointer" }}>{coin.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
