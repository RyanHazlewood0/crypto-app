import Link from "next/link";
import styled from "styled-components";
import Logo from "./svg/Logo";
import ThemeIcon from "./svg/ThemeIcon";
import Home from "./svg/Home";
import Portfolio from "./svg/Portfolio";
import SearchIcon from "./svg/SearchIcon";
import Moon from "./svg/moon";
import Search from "../Search/Search";
import CurrencySelect from "./CurrencySelect/CurrencySelect";
import { useCoin } from "@/app/contexts/CoinProvider";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 10px 0;
  padding-bottom: 30px;
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 16px;
    padding-bottom: 0;
  }
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  @media (max-width: ${breakpoints.mobile}) {
    width: 36px;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  margin-left: 10px;
  width: 36px;
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
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 168px;
    height: 36px;
    align-items: center;
  }
`;

const ThemeIconContainer = styled.div<StyleProp>`
  background: ${(props) => (props.light ? "#CCCCFA" : "#191925")};
  border: solid 1px gray;
  border-radius: 6px;
  cursor: pointer;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${breakpoints.mobile}) {
    width: 36px;
    height: 36px;
  }
`;

const HomeText = styled.p<StyleProp>`
  margin-left: 10px;
  color: ${(props) => {
    if (props.light) {
      return props.selected ? "#353570" : "gray";
    } else {
      return props.selected ? "white" : "gray";
    }
  }};
`;

type StyleProp = {
  selected?: boolean;
  light?: boolean;
};

const NavBar = () => {
  const {
    setSelectedBtn,
    selectedNavLink,
    setSelectedNavLink,
    theme,
    toggleTheme,
  } = useCoin();

  const size = useWindowSize();

  const handleSelectNavLink = (
    e: React.MouseEvent<HTMLDivElement>,
    LinkText: string
  ) => {
    setSelectedNavLink(LinkText);
  };

  return (
    <NavBarContainer>
      <LeftDiv>
        <Logo />
        {size.width > parseInt(breakpoints.mobile) && (
          <>
            <Link href="/" onClick={() => setSelectedBtn("Coins")}>
              <HomeWrapper onClick={(e) => handleSelectNavLink(e, "Home")}>
                <Home selectedNavLink={selectedNavLink} />
                <HomeText
                  selected={selectedNavLink === "Home"}
                  light={theme === "light"}
                >
                  Home
                </HomeText>
              </HomeWrapper>
            </Link>
            <Link href="/portfolio">
              <PortfolioWrapper
                onClick={(e) => handleSelectNavLink(e, "Portfolio")}
              >
                <Portfolio selectedNavLink={selectedNavLink} />
                <HomeText
                  selected={selectedNavLink === "Portfolio"}
                  light={theme === "light"}
                >
                  Portfolio
                </HomeText>
              </PortfolioWrapper>
            </Link>
          </>
        )}
      </LeftDiv>
      <RightDiv>
        <SearchDiv>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Search />
        </SearchDiv>
        <CurrencySelect />
        <ThemeIconContainer light={theme === "light"} onClick={toggleTheme}>
          {theme === "light" ? <Moon /> : <ThemeIcon />}
        </ThemeIconContainer>
      </RightDiv>
    </NavBarContainer>
  );
};

export default NavBar;
