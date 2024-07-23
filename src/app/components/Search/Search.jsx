"use client";
import { useState } from "react";
import { useCoin } from "@/app/contexts/CoinProvider";
import Link from "next/link";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: column;
  width: 356px;
`;

const SearchInput = styled.input`
  background: #191925;
  padding: 10px 10px 10px 35px;
  border-radius: 6px;
  width: 100%;
`;

const DropDown = styled.div`
  margin-top: 5px;
  position: absolute;
  width: 100%;
  background: #191925;
  padding: 10px;
  border-radius: 6px;
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

  const handleSearch = (e) => {
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

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => handleSearch(e)}
        onBlur={handleBlur}
      />
      {dropDownOpen && (
        <DropDown>
          {filteredCoins.map((coin) => (
            <LinkContainer key={coin.id}>
              <Link href={`/coin/${coin.id}`}>
                <p>{coin.name}</p>
              </Link>
            </LinkContainer>
          ))}
        </DropDown>
      )}
    </SearchContainer>
  );
};

export default Search;
