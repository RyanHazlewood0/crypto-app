import Link from "next/link";
import styled from "styled-components";
import Logo from "./svg/Logo";
import Home from "./svg/Home";
import Portfolio from "./svg/Portfolio";
import SearchIcon from "./svg/SearchIcon";
import Search from "../Search/Search";

const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 30px;
`;

const BtnContainer = styled.div`
  display: flex;
  width: 265px;
  justify-content: space-between;
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  margin-left: 10px;
`;

const HomeWrapper = styled.div`
  display: flex;
  width: 110px;
`;

const PortfolioWrapper = styled.div`
  display: flex;
  width: 131px;
`;

const NavBar = () => {
  return (
    <NavBarContainer>
      <Logo />
      <BtnContainer>
        <Link href="/">
          <HomeWrapper>
            <Home />
            <p style={{ marginLeft: "10px" }}>Home</p>
          </HomeWrapper>
        </Link>
        <Link href="/portfolio">
          <PortfolioWrapper>
            <Portfolio />
            <p style={{ color: "gray", marginLeft: "10px" }}>Portfolio</p>
          </PortfolioWrapper>
        </Link>
      </BtnContainer>
      <SearchDiv>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Search />
      </SearchDiv>
    </NavBarContainer>
  );
};

export default NavBar;
