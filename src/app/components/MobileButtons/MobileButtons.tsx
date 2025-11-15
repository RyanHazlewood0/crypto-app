import styled from "styled-components";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import { OverviewIcon } from "./svg/overview";
import { PortfolioIcon } from "./svg/portfolio";
import { ConverterIcon } from "./svg/converter";
import Link from "next/link";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";

const MobileButtons = () => {
  const size = useWindowSize();
  const { selectedMobileBtn, setSelectedMobileBtn, theme } = useCryptoContext();

  return (
    <>
      {size.width < parseInt(breakpoints.mobile) && (
        <div className={"fixed bottom-0 left-0 right-0  bg-[#232336]"}>
          <div
            className={`flex justify-between w-full px-4 ${
              theme === "light" ? "bg-white" : "bg-[#232336]"
            } `}
          >
            <Link href="/">
              <div
                className={`flex flex-col items-center justify-center flex-1 p-2.5 rounded-md ${
                  theme === "light"
                    ? selectedMobileBtn === "Overview"
                      ? "bg-[#B0B0EB] border border-[#232336]"
                      : "bg-white"
                    : selectedMobileBtn === "Overview"
                    ? "bg-[#6161d6] border border-[#a7a7cc]"
                    : "bg-[#232336]"
                }`}
                onClick={() => setSelectedMobileBtn("Overview")}
              >
                <OverviewIcon />
                <button>Overview</button>
              </div>
            </Link>
            <Link href="/">
              <div
                className={`flex flex-col items-center justify-center flex-1 p-2.5 rounded-md ${
                  theme === "light"
                    ? selectedMobileBtn === "Converter"
                      ? "bg-[#B0B0EB] border border-[#232336]"
                      : "bg-white"
                    : selectedMobileBtn === "Converter"
                    ? "bg-[#6161d6] border border-[#a7a7cc]"
                    : "bg-[#232336]"
                }`}
                onClick={() => setSelectedMobileBtn("Converter")}
              >
                <ConverterIcon />
                <button>Converter</button>
              </div>
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setSelectedMobileBtn("Portfolio")}
            >
              <div
                className={`flex flex-col items-center justify-center flex-1 p-2.5 rounded-md ${
                  theme === "light"
                    ? selectedMobileBtn === "Portfolio"
                      ? "bg-[#B0B0EB] border border-[#232336]"
                      : "bg-white"
                    : selectedMobileBtn === "Portfolio"
                    ? "bg-[#6161d6] border border-[#a7a7cc]"
                    : "bg-[#232336]"
                }`}
              >
                <PortfolioIcon />
                <button>Portfolio</button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileButtons;
