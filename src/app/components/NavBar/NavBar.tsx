import Link from "next/link";
import styled from "styled-components";
import Logo from "./svg/Logo";
import DollarSymbol from "./svg/DollarSymbol";
import ThemeIcon from "./svg/ThemeIcon";
import Home from "./svg/Home";
import Portfolio from "./svg/Portfolio";
import SearchIcon from "./svg/SearchIcon";
import Search from "../Search/Search";
import { useCoin } from "@/app/contexts/CoinProvider";

const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 10px 0;
  padding-bottom: 30px;
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

const LeftDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 483px;
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
  width: 544px;
  justify-content: space-between;
`;

const CurrencyContainer = styled.div`
  display: flex;
  background: #191925;
  width: 108px;
  border: solid 1px gray;
  border-radius: 6px;
  height: 44px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ThemeIconContainer = styled.div`
  background: #191925;
  border: solid 1px gray;
  border-radius: 6px;
  cursor: pointer;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeText = styled.p<StyleProp>`
  margin-left: 10px;
  color: ${(props) => (props.gray ? "gray" : "white")};
`;

type StyleProp = {
  gray?: boolean;
};

const NavBar = () => {
  const { setSelectedBtn } = useCoin();
  return (
    <NavBarContainer>
      <LeftDiv>
        <Logo />
        <Link href="/" onClick={() => setSelectedBtn("Coins")}>
          <HomeWrapper>
            <Home />
            <HomeText>Home</HomeText>
          </HomeWrapper>
        </Link>
        <Link href="/portfolio">
          <PortfolioWrapper>
            <Portfolio />
            <HomeText gray>Portfolio</HomeText>
          </PortfolioWrapper>
        </Link>
      </LeftDiv>
      <RightDiv>
        <SearchDiv>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Search />
        </SearchDiv>
        <CurrencyContainer>
          <DollarSymbol />
          <p>USD</p>
          <p>▼</p>
        </CurrencyContainer>
        <ThemeIconContainer>
          <ThemeIcon />
        </ThemeIconContainer>
      </RightDiv>
    </NavBarContainer>
  );
};

export default NavBar;
