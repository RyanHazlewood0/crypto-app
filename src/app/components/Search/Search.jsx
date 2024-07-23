import { useState } from "react";
import styled from "styled-components";

const SearchInput = styled.input`
  background: #191925;
  padding: 10px 10px 10px 35px;
  border-radius: 6px;
`;

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault;
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => handleChangeSearchValue(e)}
      />
    </form>
  );
};

export default Search;
