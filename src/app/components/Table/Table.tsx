import { useState } from "react";
import { useEffect } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { abbreviateNumber, findVolumeLevel } from "helper-functions";
import { Coin } from "types";
import TableLineChart from "../TableLineChart/TableLineChart";
import Link from "next/link";
import styled from "styled-components";
import useWindowSize from "windowSizeHook";
import InfiniteScroll from "react-infinite-scroll-component";
import TrendingModal from "../TrendingModal/TrendingModal";

const LoadingMessage = styled.p`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
`;

const HeaderText = styled.p<StyleProp>`
  color: ${(props) => (props.$light ? "#424286" : "#d1d1d1")};
  font-size: 14px;
  margin-bottom: 20px;
`;

type StyleProp = {
  $left?: boolean;
  $green?: boolean;
  $right?: boolean;
  $gray?: boolean;
  $light?: boolean;
};

const Table = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("descending mcap");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableCoins, setTableCoins] = useState([]);
  const [trendingModalOpen, setTrendingModalOpen] = useState(false);

  const { fiatCurrency, theme, coins } = useCryptoContext();
  const size = useWindowSize();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    const getCoinData = async () => {
      try {
        const response1: Response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData1: Coin[] = await response1.json();
        setTableCoins(fetchedData1);
        setIsLoading(false);
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    };
    getCoinData();
    setCurrentPage(currentPage + 1);
  }, [fiatCurrency, apiKey, setTableCoins]);

  const getMoreData = async () => {
    const response: Response = await fetch(
      `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=50&page=${currentPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
    );
    const data: Coin[] = await response.json();
    setTableCoins([...tableCoins, ...data]);
    setCurrentPage(currentPage + 1);
  };

  const getSortOption = (
    e: React.MouseEvent<HTMLSpanElement>,
    order: string
  ) => {
    setSortOrder(order);
  };

  const openTrending = () => {
    setTrendingModalOpen(true);
  };

  const sortedCoins = [...tableCoins].sort((a, b): number => {
    if (sortOrder === "price-desc") {
      return a.current_price - b.current_price;
    } else if (sortOrder === "price-asc") {
      return b.current_price - a.current_price;
    } else if (sortOrder === "1h-desc") {
      return (
        a.price_change_percentage_1h_in_currency -
        b.price_change_percentage_1h_in_currency
      );
    } else if (sortOrder === "1h-asc") {
      return (
        b.price_change_percentage_1h_in_currency -
        a.price_change_percentage_1h_in_currency
      );
    } else if (sortOrder === "24h-desc") {
      return (
        a.price_change_percentage_24h_in_currency -
        b.price_change_percentage_24h_in_currency
      );
    } else if (sortOrder === "24h-asc") {
      return (
        b.price_change_percentage_24h_in_currency -
        a.price_change_percentage_24h_in_currency
      );
    } else if (sortOrder === "7d-desc") {
      return (
        a.price_change_percentage_7d_in_currency -
        b.price_change_percentage_7d_in_currency
      );
    } else if (sortOrder === "7d-asc") {
      return (
        b.price_change_percentage_7d_in_currency -
        a.price_change_percentage_7d_in_currency
      );
    } else if (sortOrder === "mcap-desc") {
      return a.market_cap - b.market_cap;
    } else if (sortOrder === "mcap-asc") {
      return b.market_cap - a.market_cap;
    } else if (sortOrder === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (sortOrder === "name-asc") {
      return a.name.localeCompare(b.name);
    }
  });

  if (isLoading) {
    return <LoadingMessage>Loading coin table data...</LoadingMessage>;
  }

  if (hasError) {
    return <LoadingMessage>Error loading coin data...</LoadingMessage>;
  }

  return (
    <>
      <HeaderText
        $light={theme === "light"}
        style={{ cursor: "pointer", width: "284px" }}
        onClick={openTrending}
      >
        Click here to see top 5 trending coins (24H)
      </HeaderText>
      {trendingModalOpen && (
        <TrendingModal setTrendingModalOpen={setTrendingModalOpen} />
      )}
      <div className="w-full overflow-x-auto">
        <table
          className={
            "w-full my-0 mx-auto border-separate border-spacing-y-[6px] min-w-[320px]"
          }
        >
          <thead className={"text-[12px]"}>
            <tr className={"w-full text-[14px]"}>
              <th
                className={
                  "p-[5px] md:py-[5px] md:px-[15px] w-[120px] md:max-w-[200px]"
                }
              >
                <p className={"flex mb-[10px] text-xs md:text-sm"}>
                  Name{" "}
                  <span
                    onClick={(e) => getSortOption(e, "name-desc")}
                    className={"cursor-pointer"}
                  >
                    ▼{" "}
                  </span>
                  <span
                    onClick={(e) => getSortOption(e, "name-asc")}
                    className={"cursor-pointer"}
                  >
                    ▲
                  </span>
                </p>
              </th>

              <th
                className={
                  "p-[5px] md:py-[5px] md:px-[15px] w-[80px] md:w-auto"
                }
              >
                <p className={"flex mb-[10px] text-xs md:text-sm"}>
                  Price{" "}
                  <span
                    onClick={(e) => getSortOption(e, "price-desc")}
                    className={"cursor-pointer"}
                  >
                    ▼{" "}
                  </span>
                  <span
                    onClick={(e) => getSortOption(e, "price-asc")}
                    className={"cursor-pointer"}
                  >
                    ▲
                  </span>
                </p>
              </th>

              <th
                className={"hidden lg:table-cell p-0 md:py-[5px] md:px-[15px]"}
              >
                <p className={"flex mb-[10-px]"}>
                  1h%{" "}
                  <span
                    className={"cursor-pointer"}
                    onClick={(e) => getSortOption(e, "1h-desc")}
                  >
                    ▼
                  </span>
                  <span
                    className={"cursor-pointer"}
                    onClick={(e) => getSortOption(e, "1h-asc")}
                  >
                    ▲
                  </span>
                </p>
              </th>

              <th
                className={"hidden lg:table-cell p-0 md:py-[5px] md:px-[15px]"}
              >
                <p className={"flex mb-[10-px]"}>
                  24h%{" "}
                  <span
                    className={"cursor-pointer"}
                    onClick={(e) => getSortOption(e, "24h-desc")}
                  >
                    ▼
                  </span>
                  <span
                    className={"cursor-pointer"}
                    onClick={(e) => getSortOption(e, "24h-asc")}
                  >
                    ▲
                  </span>
                </p>
              </th>

              <th
                className={"hidden lg:table-cell p-0 md:py-[5px] md:px-[15px]"}
              >
                <p className={"flex mb-[10-px]"}>
                  7d%{" "}
                  <span
                    className={"cursor-pointer"}
                    onClick={(e) => getSortOption(e, "7d-desc")}
                  >
                    ▼
                  </span>
                  <span
                    className={"cursor-pointer"}
                    onClick={(e) => getSortOption(e, "7d-asc")}
                  >
                    ▲
                  </span>
                </p>
              </th>

              <th
                className={"hidden md:table-cell p-0 md:py-[5px] md:px-[15px]"}
              >
                24h Volume / Market Cap
              </th>
              <th className={"p-0 md:py-[5px] md:px-[15px]"}>Last 7d</th>
            </tr>
          </thead>

          <tbody>
            {sortedCoins.map((coin) => (
              <tr
                key={coin.id}
                className={`w-full text-[14px] md:text-[16px] mb-[6px]  ${
                  theme === "light" ? "bg-white" : "bg-[#191925]"
                }`}
              >
                <td
                  className={
                    "rounded-l-lg p-[5px] md:p-[10px] w-[120px] md:max-w-[200px]"
                  }
                >
                  <div className={"flex items-center overflow-hidden truncate"}>
                    <img
                      src={coin.image}
                      className={
                        "w-[24px] md:w-[32px] mr-[8px] md:mr-[10px] flex-shrink-0"
                      }
                    />
                    <Link
                      href={`/coin/${coin.id}`}
                      className={"flex min-w-0 truncate"}
                    >
                      <div className={"hidden md:block md:mr-1 truncate"}>
                        {coin.name}{" "}
                      </div>
                      <div className={"block md:hidden truncate"}>
                        {coin.symbol.toUpperCase()}
                      </div>
                      <div className={"hidden md:flex"}>
                        ({coin.symbol.toUpperCase()})
                      </div>
                    </Link>
                  </div>
                </td>
                <td className={"p-[5px] md:p-[10px] w-[80px] md:w-auto"}>
                  <div className="truncate">
                    ${abbreviateNumber(coin.current_price)}
                  </div>
                  <div
                    className={` block md:hidden text-sm
                    ${
                      coin.price_change_percentage_1h_in_currency >= 0
                        ? "text-[#01f1e3]"
                        : "text-[#fe2264]"
                    }`}
                  >
                    {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                  </div>
                </td>
                {coin.price_change_percentage_1h_in_currency ? (
                  <td className={"p-[10px] hidden lg:table-cell"}>
                    <div
                      className={
                        coin.price_change_percentage_1h_in_currency >= 0
                          ? "text-[#01f1e3]"
                          : "text-[#fe2264]"
                      }
                    >
                      {" "}
                      {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                    </div>
                  </td>
                ) : (
                  <td className={"p-[10px] hidden lg:table-cell"}>
                    <div>0</div>
                  </td>
                )}

                {coin.price_change_percentage_24h_in_currency ? (
                  <td className={"p-[10px] hidden lg:table-cell"}>
                    <div
                      className={
                        coin.price_change_percentage_1h_in_currency >= 0
                          ? "text-[#01f1e3]"
                          : "text-[#fe2264]"
                      }
                    >
                      {" "}
                      {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                    </div>
                  </td>
                ) : (
                  <td className={"p-[10px] hidden lg:table-cell"}>
                    <div>0</div>
                  </td>
                )}

                {coin.price_change_percentage_7d_in_currency ? (
                  <td className={"p-[10px] hidden lg:table-cell"}>
                    <div
                      className={
                        coin.price_change_percentage_1h_in_currency >= 0
                          ? "text-[#01f1e3]"
                          : "text-[#fe2264]"
                      }
                    >
                      {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </div>
                  </td>
                ) : (
                  <td className={"p-[10px] hidden lg:table-cell"}>
                    <div>0</div>
                  </td>
                )}

                <td
                  className={
                    "hidden md:table-cell p-[10px] w-[140px] lg:w-[220px]"
                  }
                >
                  <div className={"w-full"}>
                    <div
                      className={
                        "flex justify-between w-full text-sm lg:text-base"
                      }
                    >
                      {coin.total_volume && coin.market_cap && (
                        <>
                          <div className="truncate">
                            {abbreviateNumber(coin.total_volume)}
                          </div>
                          <div className="truncate">
                            {abbreviateNumber(coin.market_cap)}
                          </div>
                        </>
                      )}
                    </div>
                    <div className={"flex h-[5px] rounded-lg bg-[#40916c] "}>
                      <div
                        className={"h-[5px] rounded-lg bg-[#30e0a1]"}
                        style={{ width: `${findVolumeLevel(coin)}%` }}
                      />
                    </div>
                  </div>
                </td>

                <td
                  className={
                    "rounded-r-lg p-[5px] md:p-[10px] max-w-[125px] md:max-w-[200px] lg:max-w-[220px]"
                  }
                >
                  <div className={"h-[40px] md:h-[50px]"}>
                    <TableLineChart coin={coin} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <InfiniteScroll
          dataLength={tableCoins.length}
          next={getMoreData}
          hasMore={tableCoins.length < coins.length}
          loader={<h4>Loading...</h4>}
        >
          {""}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Table;
