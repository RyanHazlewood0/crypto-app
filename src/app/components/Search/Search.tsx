"use client";
import { useState } from "react";
import { useCoin } from "@/app/contexts/CoinProvider";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { CoinTypes } from "types";

const SearchContainer = styled.div`
  display: column;
  width: 356px;
`;

const SearchInput = styled.input`
  background: #191925;
  padding: 10px 10px 10px 35px;
  border-radius: 6px;
  width: 100%;
  border: solid 1px gray;
`;

const DropDown = styled.div`
  margin-top: 5px;
  position: absolute;
  width: 100%;
  background: #191925;
  padding: 10px;
  border-radius: 6px;
  z-index: 1;
`;

const LinkContainer = styled.div`
  &:hover {
    background-color: #0077b6;
  }
`;

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { coins } = useCoin();
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value.length !== 0) {
      setDropDownOpen(true);
    } else {
      setDropDownOpen(false);
    }
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.id.includes(searchValue) ||
      coin.symbol.includes(searchValue) ||
      coin.name.includes(searchValue)
  );

  const handleBlur = () => {
    setDropDownOpen(false);
  };

  const handleNavLink = (coin: CoinTypes) => {
    router.push(`/coin/${coin.id}`);
    setSearchValue("");
  };

  return (
    <SearchContainer onBlur={handleBlur}>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => handleSearch(e)}
      />
      {dropDownOpen && (
        <DropDown>
          {filteredCoins.map((coin) => (
            <LinkContainer
              key={coin.id}
              onMouseDown={() => handleNavLink(coin)}
            >
              <p style={{ cursor: "pointer" }}>{coin.name}</p>
            </LinkContainer>
          ))}
        </DropDown>
      )}
    </SearchContainer>
  );
};

export default Search;
