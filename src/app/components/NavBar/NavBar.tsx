import Link from "next/link";
import Logo from "./svg/Logo";
import ThemeIcon from "./svg/ThemeIcon";
import Home from "./svg/Home";
import Portfolio from "./svg/Portfolio";
import SearchIcon from "./svg/SearchIcon";
import Moon from "./svg/Moon";
import Search from "../Search/Search";
import CurrencySelect from "./CurrencySelect/CurrencySelect";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

const NavBar = () => {
  const {
    setSelectedBtn,
    selectedNavLink,
    setSelectedNavLink,
    theme,
    toggleTheme,
    setSelectedMobileBtn,
  } = useCryptoContext();

  const size = useWindowSize();

  const handleSelectNavLink = (
    e: React.MouseEvent<HTMLDivElement>,
    LinkText: string
  ) => {
    setSelectedNavLink(LinkText);
  };

  const handleLogoClick = () => {
    setSelectedNavLink("Home");
    setSelectedMobileBtn("Overview");
  };

  return (
    <div className="flex w-full items-center justify-between mb-[16px] pb[0px] md:pb-[30px] mt-[15px] md:mb-[10px] ">
      <div className="flex justify-between items-center w-[483px]">
        <Link href="/" onClick={handleLogoClick}>
          <Logo />
        </Link>
        {size.width > parseInt(breakpoints.mobile) && (
          <>
            <Link href="/" onClick={() => setSelectedBtn("Coins")}>
              <div
                onClick={(e) => handleSelectNavLink(e, "Home")}
                className="flex w-[110px]"
              >
                <Home selectedNavLink={selectedNavLink} />
                <p
                  className={`${
                    theme === "light"
                      ? selectedNavLink === "Home"
                        ? "text-[#353570]"
                        : "text-gray-500"
                      : selectedNavLink === "Home"
                      ? "text-white"
                      : "text-gray-500"
                  }ml-[10px]`}
                >
                  Home
                </p>
              </div>
            </Link>
            <Link href="/portfolio">
              <div
                onClick={(e) => handleSelectNavLink(e, "Portfolio")}
                className="flex w-[131px]"
              >
                <Portfolio selectedNavLink={selectedNavLink} />
                <p
                  className={`${
                    theme === "light"
                      ? selectedNavLink === "Portfolio"
                        ? "text-[#353570]"
                        : "text-gray-500"
                      : selectedNavLink === "Portfolio"
                      ? "text-white"
                      : "text-gray-500"
                  }ml-[10px]`}
                >
                  Portfolio
                </p>
              </div>
            </Link>
          </>
        )}
      </div>
      <div className=" justify-between h-[36px] flex items-center gap-[5px]">
        <div className="flex items-center relative w-[36px] md:w-auto">
          <div className="absolute ml-[10px] w-[36px]">
            <SearchIcon />
          </div>
          <Search />
        </div>
        <CurrencySelect />
        <div
          className={`${
            theme === "light" ? "bg-[#CCCCFA]" : "bg-[#191925]"
          } w-[36px] h-[36px] md:w-[44px] md:h-[44px] items-center justify-center flex cursor-pointer rounded-[6px] border border-gray-500`}
          onClick={toggleTheme}
        >
          {theme === "light" ? <Moon /> : <ThemeIcon />}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
