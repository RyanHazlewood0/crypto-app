"use client";
import { useState } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Coin } from "types";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

const SearchContainer = styled.div`
  display: column;
  width: 356px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 36px;
    height: 36px;
  }
`;

const SearchInput = styled.input<ThemeProp>`
  background: ${(props) => (props.light ? "#CCCCFA" : "#191925")};
  padding: 10px 10px 10px 35px;
  border-radius: 6px;
  width: 100%;
  border: solid 1px gray;
  @media (max-width: ${breakpoints.mobile}) {
    width: 36px;
    height: 36px;
    padding: 0;
  }
`;

const DropDown = styled.div<ThemeProp>`
  margin-top: 5px;
  width: 100%;
  background: ${(props) => (props.light ? "#CCCCFA" : "#191925")};
  padding: 10px;
  border-radius: 6px;
  position: absolute;
  z-index: 4;
  @media (max-width: ${breakpoints.mobile}) {
    width: 168px;
  }
`;

const LinkContainer = styled.div`
  &:hover {
    background-color: #0077b6;
  }
`;

type ThemeProp = {
  light?: boolean;
};

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { coins, theme } = useCryptoContext();
  const router = useRouter();
  const size = useWindowSize();

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
    <SearchContainer onBlur={handleBlur}>
      <SearchInput
        type="text"
        placeholder={
          size.width > parseInt(breakpoints.mobile) ? "Search..." : ""
        }
        value={searchValue}
        onChange={handleSearch}
        light={theme === "light"}
      />
      {dropDownOpen && (
        <DropDown light={theme === "light"}>
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
