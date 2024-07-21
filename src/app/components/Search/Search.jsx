import styled from "styled-components";

const SearchInput = styled.input`
  background: #191925;
  padding: 10px 10px 10px 35px;
  border-radius: 6px;
`;

const Search = () => {
  return <SearchInput type="text" placeholder="Search..." />;
};

export default Search;
